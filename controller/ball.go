package controller

import (
	"net/http"
	"time"
	"github.com/gin-gonic/gin"
	"github.com/n6teen/reactbasic/entity"
)
func GetBP3_info(c *gin.Context) {
	id := c.Param("id")
	type BP3_INFO struct {
		ServiceID       int
		ServicePrice    int
		MemberID        int
		MemberFirstName string
		MemberLastName  string
	}

	var s entity.Service
	var m entity.Member
	var info BP3_INFO

	if err := entity.DB().Raw("SELECT * FROM services WHERE id = ?", id).Scan(&s).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if err := entity.DB().Raw("SELECT * FROM members WHERE id = ?", s.MemberID).Scan(&m).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	info.ServiceID = int(s.ID);
	info.ServicePrice = int(s.Price);
	info.MemberID = int(m.ID);
	info.MemberFirstName = m.FirstName;
	info.MemberLastName = m.LastName;

	c.JSON(http.StatusOK, gin.H{"data": info})
}

func DeletePaymentByID(c *gin.Context){
	id := c.Param("id")
	if err := entity.DB().Exec("DELETE FROM payments WHERE id = ?", id); err.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "payment not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": id})
}
func CreatePayment(c *gin.Context) {
	var payment entity.Payment
	payment.Date = time.Now()

	if err := c.ShouldBindJSON(&payment); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	p := entity.Payment{
		Receipt:         payment.Receipt,
		Date:            payment.Date,
		ServiceID:       payment.ServiceID,
		MemberID:        payment.MemberID,
		MemberFirstName: payment.MemberFirstName,
		MemberLastName:  payment.MemberLastName,
	}

	if err := entity.DB().Create(&p).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return

	}

	c.JSON(http.StatusOK, gin.H{"data": p})
}