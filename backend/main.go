package main

import (
	"context"
	"log"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
	openai "github.com/sashabaranov/go-openai"
)

func main() {
	// APIキーを設定
	apiKey := os.Getenv("OPENAI_API_KEY")

	// OpenAIクライアントを初期化
	client := openai.NewClient(apiKey)

	// Ginルーターを設定
	router := gin.Default()

	// POST /completionsエンドポイントのハンドラーを設定
	router.POST("/completions", func(c *gin.Context) {
		// リクエストのJSONペイロードからpromptを取得
		var request struct {
			Prompt string `json:"prompt"`
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

		// 完了をJSONで返す
		c.JSON(http.StatusOK, gin.H{"completion": response.Choices[0].Message.Content})
	})

	// サーバーを起動
	if err := router.Run(":8080"); err != nil {
		log.Fatal(err)
	}
}
