package controller

import (
	"fmt"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/n6teen/reactbasic/entity"
)

func CreateMember(c *gin.Context) {
	var member entity.Member
	if err := c.ShouldBindJSON(&member); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if err := entity.DB().Create(&member).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": member})
}

// =====================================================================Review
func CreateReview(c *gin.Context) {
	var review entity.Review
	if err := c.ShouldBindJSON(&review); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if err := entity.DB().Create(&review).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": review})
}

func GetReview(c *gin.Context) {
	var review entity.Review
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM reviews WHERE id = ?", id).Scan(&review).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": review})
}

func ListReview(c *gin.Context) {
	var review []entity.Review
	if err := entity.DB().Raw("SELECT * FROM reviews").Scan(&review).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": review})
}

// =====================================================================Report
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

//=====================================================================User
// POST /users

func CreateUser(c *gin.Context) {
	var members entity.Member

	if err := c.ShouldBindJSON(&members); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Create(&members).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": members})
}
func ListUsers(c *gin.Context) {
	username := c.Param("user_name")
	password := c.Param("password")
	var user entity.Member
	fmt.Println(password)

	err := entity.DB().Raw("SELECT user_name, password,id FROM members WHERE user_name = ?", username).Scan(&user).Error
	if err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return

	} else {
		if username != user.UserName {
			fmt.Println(username)
			fmt.Println(user.UserName)
			c.JSON(http.StatusBadRequest, gin.H{"error": "User Not found"})
			return
		} else {
			if password != user.Password {
				c.JSON(http.StatusBadRequest, gin.H{"error": "invalid password"})
				fmt.Println(password)
				fmt.Println(user.Password)
				return
			} else {
				c.JSON(http.StatusOK, gin.H{"data": user})
				return
			}
		}
	}
}

func GetMemberById(c *gin.Context) {
	var member []entity.Member
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM members WHERE id = ?", id).Scan(&member).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": member})
}

func GetIdByPassword(c *gin.Context) {
	var member []entity.Member
	password := c.Param("password")
	if err := entity.DB().Raw("SELECT id FROM members WHERE password = ?", password).Scan(&member).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": member})
}

// -------------------------------------PRAW---------------------------------------
func ListAccomodations(c *gin.Context) { //อยากดึงทั้งหมด

	var accomodations []entity.Accomodation //ดึงข้อมูลทั้งหมดจะmapและดึงข้อมูลไปใส่ให้เช็คว่ามีerrorไหม

	if err := entity.DB().Raw("SELECT * FROM accomodations").Scan(&accomodations).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}
	c.JSON(http.StatusOK, gin.H{"data": accomodations})
}

func ListHour_of_works(c *gin.Context) { //อยากดึงทั้งหมด

	var hour_of_works []entity.Hour_of_work //ดึงข้อมูลทั้งหมดจะmapและดึงข้อมูลไปใส่ให้เช็คว่ามีerrorไหม

	if err := entity.DB().Raw("SELECT * FROM hour_of_works").Scan(&hour_of_works).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": hour_of_works})

}

func CreateService(c *gin.Context) {

	var service entity.Service //สร้างข้อมูล
	//---------------------------------------------
	var accommodation entity.Accomodation
	var hour_of_work entity.Hour_of_work
	var maid entity.Maid
	var member entity.Member
	//----------------------------------------------
	if err := c.ShouldBindJSON(&service); err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	//-----------------------------------------------
	// if tx := entity.DB().Where("id = ?", service.MemberID).First(&member); tx.RowsAffected == 0 {
	// 	c.JSON(http.StatusBadRequest, gin.H{"error": "Member not found"})
	// 	return
	// }
	if tx := entity.DB().Where("status = ?", "ว่าง").First(&maid); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "No available maids found"})
		return
	}

	if tx := entity.DB().Where("id = ?", service.AccomodationID).First(&accommodation); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Accommodation not found"})
		return
	}
	if tx := entity.DB().Where("id = ?", service.Hour_of_workID).First(&hour_of_work); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Hour of work not found"})
		return
	}

	// PickDate, err := time.Parse("2006-01-02", service.PickDate)
	// if err != nil {
	// 	c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	// 	return
	// }

	u := entity.Service{
		Member: member,
		Accomodation: accommodation,
		Hour_of_work: hour_of_work,
		Maid:         maid,
		Has_pet:      service.Has_pet,
		Pet_detail:   service.Pet_detail,
		PickDate:     service.PickDate,
		PickTime:     service.PickTime,
		Price:        float32(accommodation.Price + hour_of_work.Price),
	}
	//-----------------------------------------------

	if err := entity.DB().Model(&maid).Update("status", "ไม่ว่าง").Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Create(&u).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}
	c.JSON(http.StatusOK, gin.H{"data": u})

}

type CombinedData struct {
	Service entity.Service
	Member  entity.Member
	Accom   entity.Accomodation
	Maid    entity.Maid
	Hour    entity.Hour_of_work
}

func GetService(c *gin.Context) {
	type CombinedData struct {
		Service    entity.Service
		Member     entity.Member
		Accom      entity.Accomodation
		Maid       entity.Maid
		HourOfWork entity.Hour_of_work
	}
	type BP2_info struct {
		Accom_type   string
		Accom_charge int
		HHour        string
		Date         string
		M_firstname  string
		M_lastname   string
		M_Tel        string
		Have_pet     string
		Location     string
	}

	id := c.Param("id")

	var combinedData CombinedData
	var info BP2_info

	if err := entity.DB().Raw("SELECT * FROM services WHERE member_id = ?", id).Scan(&combinedData.Service).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	info.Date = combinedData.Service.PickDate
	info.Have_pet = combinedData.Service.Has_pet

	if err := entity.DB().Raw("SELECT * FROM maids WHERE id = ?", id).Scan(&combinedData.Maid).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	info.M_firstname = combinedData.Maid.FirstName
	info.M_lastname = combinedData.Maid.LastName
	info.M_Tel = combinedData.Maid.Tel

	if err := entity.DB().Raw("SELECT * FROM members WHERE id = ?", id).Scan(&combinedData.Member).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	info.Location = combinedData.Member.Address

	if err := entity.DB().Raw("SELECT *  FROM accommodations WHERE id = ?", id).Scan(&combinedData.Accom).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	info.Accom_type = combinedData.Accom.Name_type
	info.Accom_charge = combinedData.Accom.Price

	if err := entity.DB().Raw("SELECT * FROM hour_of_works WHERE id = ?", id).Scan(&combinedData.HourOfWork).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	info.HHour = combinedData.HourOfWork.Hour

	c.JSON(http.StatusOK, gin.H{"data": info})
}
			var service entity.Service //สร้างข้อมูล
			//---------------------------------------------
			var accommodation entity.Accomodation
			var hour_of_work entity.Hour_of_work
			var maid entity.Maid
			var member entity.Member
			//----------------------------------------------

			if err := c.ShouldBindJSON(&service); err != nil {
				c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

				return
			}

			if tx := entity.DB().Where("id = ?", service.MemberID).First(&member); tx.RowsAffected == 0 {
				c.JSON(http.StatusBadRequest, gin.H{"error": "Member not found"})
				return
			}
			if tx := entity.DB().Where("status = ?", "ว่าง").First(&maid); tx.RowsAffected == 0 {
					c.JSON(http.StatusBadRequest, gin.H{"error": "No available maids found"})
					return
				}
			
			if tx := entity.DB().Where("id = ?", service.AccomodationID).First(&accommodation); tx.RowsAffected == 0 {
				c.JSON(http.StatusBadRequest, gin.H{"error": "Accommodation not found"})
				return
			}
			if tx := entity.DB().Where("id = ?", service.Hour_of_workID).First(&hour_of_work); tx.RowsAffected == 0 {
				c.JSON(http.StatusBadRequest, gin.H{"error": "Hour of work not found"})
				return
			}
			// PickDate, err := time.Parse("2006-01-02", service.PickDate)
			// if err != nil {
			// 	c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			// 	return
			// }
			u := entity.Service{
				Member: member,
				Accomodation: accommodation,
				Hour_of_work: hour_of_work,
				Maid: maid,
				Has_pet:    service.Has_pet,         
				Pet_detail: service.Pet_detail,
				PickDate: service.PickDate,
				PickTime: service.PickTime,
				Price: float32(accommodation.Price+hour_of_work.Price),
			}
			//-----------------------------------------------
			if err := entity.DB().Model(&maid).Update("status", "ไม่ว่าง").Error; err != nil {
				c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
				return
			}
		
			if err := entity.DB().Create(&u).Error; err != nil {
		
				c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		
				return
		
			}
			c.JSON(http.StatusOK, gin.H{"data": u})
		}
		
		type CombinedData struct {
			Service entity.Service
			Member  entity.Member
			Accom   entity.Accomodation
			Maid	  entity.Maid
			Hour 	  entity.Hour_of_work
		  }
		  
func GetService(c *gin.Context) {
			type CombinedData struct {
			  Service entity.Service
			  Member  entity.Member
			  Accom   entity.Accomodation
			  Maid    entity.Maid
			  HourOfWork    entity.Hour_of_work
			}
			type BP2_info struct{
				Accom_type string;
				Accom_charge int;
				HHour string;
				Date string;
				M_firstname string;
				M_lastname string;
				M_Tel string;
				Have_pet string;
				Location string;
				Time string;
				Detail string;
				Price float32;
			}
			
			id := c.Param("id")
			
			var combinedData CombinedData
			var info BP2_info
			
			if err := entity.DB().Raw("SELECT * FROM services WHERE member_id = ? ORDER BY created_at DESC LIMIT 1", id).Scan(&combinedData.Service).Error; err != nil {
			  c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			  return
			}
			info.Date = combinedData.Service.PickDate;
			info.Time = combinedData.Service.PickTime
			info.Detail = combinedData.Service.Pet_detail;
			info.Have_pet = combinedData.Service.Has_pet;
			info.Price = combinedData.Service.Price;
			
			if err := entity.DB().Raw("SELECT * FROM maids WHERE id = ?",id).Scan(&combinedData.Maid).Error; err != nil {
			  c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			  return
			}
			info.M_firstname = combinedData.Maid.FirstName;
			info.M_lastname = combinedData.Maid.LastName;
			info.M_Tel = combinedData.Maid.Tel;
			
			if err := entity.DB().Raw("SELECT * FROM members WHERE id = ?",id).Scan(&combinedData.Member).Error; err != nil {
			  c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			  return
			}
			info.Location = combinedData.Member.Address;
			
			if err := entity.DB().Raw("SELECT *  FROM accomodations WHERE id = ?", id).Scan(&combinedData.Accom).Error; err != nil {
			  c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			  return
			}
			info.Accom_type = combinedData.Accom.Name_type;
			
			if err := entity.DB().Raw("SELECT * FROM hour_of_works WHERE id = ?", id).Scan(&combinedData.HourOfWork).Error; err != nil {
			  c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			  return
			}
			info.HHour = combinedData.HourOfWork.Hour;
		
			
			c.JSON(http.StatusOK, gin.H{"data": info})
			}

func GetMember(c *gin.Context) {//ดึงข้อมูลมาดูแต่ต้องการดูแค่คนนี้โดยใช้id

	var member entity.Member
	
	id := c.Param("id")
	
	if err := entity.DB().Raw("SELECT * FROM members WHERE id = ?", id).Scan(&member).Error; err != nil {
	
	c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()}) //ในคำสั่งนี้ใช้คิวรี่เอาแค่ไอดีที่ส่งมานะ
	
	return
	
	}
	
	c.JSON(http.StatusOK, gin.H{"data": member})
	
	}

// Ball Function
func CreatePayment(c *gin.Context) {
	var payment entity.Payment
	payment.Date = time.Now()
	//var service entity.Service

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
	if err := entity.DB().Raw("SELECT * FROM members WHERE id = ?", id).Scan(&m).Error; err != nil {
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