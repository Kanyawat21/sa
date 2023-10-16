package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/n6teen/reactbasic/entity"
)
func CreateReport(c *gin.Context) {
	var report entity.Report
	if err := c.ShouldBindJSON(&report); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if err := entity.DB().Create(&report).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": report})
}
