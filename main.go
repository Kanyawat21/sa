package main

import (
	"github.com/n6teen/reactbasic/controller"
	"github.com/n6teen/reactbasic/entity"
	"github.com/gin-gonic/gin"
)

const PORT = "8080"

func main() {
	entity.SetupDatabase()
	r := gin.Default()
	r.Use(CORSMiddleware())
	r.GET("/review", controller.ListReview)
	r.GET("/review/:id", controller.GetReview)
	r.POST("/member", controller.CreateMember)
	r.POST("/review", controller.CreateReview)
	r.POST("/report",controller.CreateReport)
	r.POST("/Member", controller.CreateUser)
	r.GET("/Member/:user_name/:password", controller.ListUsers)
	r.GET("members/:id", controller.GetMemberById)

	r.GET("/accomodations", controller.ListAccomodations)
	r.GET("/hour_of_works", controller.ListHour_of_works)
	r.POST("/services", controller.CreateService)

	r.Run("localhost: " + PORT)
}

func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT")
		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}
		c.Next()
	}
}

//HIkkkkkkk
