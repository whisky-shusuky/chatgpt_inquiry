package main

import (
	"context"
	"log"
	"net/http"
	"os"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	openai "github.com/sashabaranov/go-openai"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

// Inquiry 構造体は、プロンプト、メール、および `openai` からの応答を保持します。
type Inquiry struct {
	gorm.Model
	Prompt     string
	Email      string
	Completion string
}

func main() {
	// APIキーを設定
	apiKey := os.Getenv("OPENAI_API_KEY")

	// OpenAIクライアントを初期化
	client := openai.NewClient(apiKey)

	// Ginルーターを設定
	router := gin.Default()

	config := cors.DefaultConfig()
	config.AllowOrigins = []string{"http://localhost:3000"} // 許可するオリジンを指定
	router.Use(cors.New(config))

	// MySQLに接続
	dsn := "myuser:mypassword@tcp(mysql:3306)/myapp?charset=utf8mb4&parseTime=True&loc=Local"
	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatalf("failed to connect database: %v", err)
	}

	// inquiry テーブルをマイグレーション
	err = db.AutoMigrate(&Inquiry{})
	if err != nil {
		log.Fatalf("failed to migrate database: %v", err)
	}

	// GET /inquiry エンドポイントのハンドラを設定
	router.GET("/inquiry", func(c *gin.Context) {
		// Inquiry テーブルからすべての行を取得
		var inquiries []Inquiry
		if err := db.Find(&inquiries).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

		// JSONで返す
		c.JSON(http.StatusOK, inquiries)
	})

	// POST /エンドポイントのハンドラーを設定
	router.POST("/", func(c *gin.Context) {
		// リクエストのJSONペイロードからpromptとemailを取得
		var request struct {
			Prompt string `json:"prompt"`
			Email  string `json:"email"`
		}
		if err := c.BindJSON(&request); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		// OpenAI APIを呼び出す
		prerequisite := "あなたは動画サイトの運営者として振る舞ってください。ユーザーから以下のようなクレームがありました。"
		content := prerequisite + request.Prompt
		response, err := client.CreateChatCompletion(
			context.Background(),
			openai.ChatCompletionRequest{
				Model: openai.GPT3Dot5Turbo,
				Messages: []openai.ChatCompletionMessage{
					{
						Role:    openai.ChatMessageRoleUser,
						Content: content,
					},
				},
			},
		)

		if err != nil {
			log.Fatal(err)
			c.JSON(http.StatusInternalServerError, gin.H{"error": "API error"})
			return
		}

		// Inquiry 構造体を作成
		inquiry := Inquiry{
			Prompt:     request.Prompt,
			Email:      request.Email,
			Completion: response.Choices[0].Message.Content,
		}

		// MySQLに保存
		err = db.Create(&inquiry).Error
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

		// 完了をJSONで返す
		c.JSON(http.StatusOK, gin.H{"completion": response.Choices[0].Message.Content})
	})

	// サーバーを起動
	if err := router.Run(":8080"); err != nil {
		log.Fatal(err)
	}
}
