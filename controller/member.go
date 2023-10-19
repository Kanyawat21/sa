package controller

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/n6teen/reactbasic/entity"
)


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



//=====================================================================User
// POST /users

func CreateMember(c *gin.Context) {
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
func GetMember(c *gin.Context) {
	username := c.Param("user_name") 
	password := c.Param("password") 
	var user entity.Member
	fmt.Println(password)

	err := entity.DB().Raw("SELECT user_name, password,id FROM members WHERE user_name = ?", username).Scan(&user).Error
	if err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return

	}else{
		if(username!=user.UserName){
			fmt.Println(username)
			fmt.Println(user.UserName)
			c.JSON(http.StatusBadRequest, gin.H{"error": "User Not found"})
			return
		}else{
			if (password!=user.Password){
				c.JSON(http.StatusBadRequest, gin.H{"error": "invalid password"})
				fmt.Println(password)
				fmt.Println(user.Password)
				return
			}else{
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

			var service entity.Service 
			var accommodation entity.Accomodation
			var hour_of_work entity.Hour_of_work
			var maid entity.Maid
			var member entity.Member
			
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

			func GetUsername(c *gin.Context) {
				var member entity.Member
				username := c.Param("user_name")
				if err := entity.DB().Raw("SELECT user_name FROM members WHERE user_name = ?", username).Scan(&member).Error; err != nil {
					c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
					return
				}
				if(username!=member.UserName){
					c.JSON(http.StatusOK, gin.H{"data": member.UserName})
					return
				}
				c.JSON(http.StatusOK, gin.H{"data": member.UserName})
				
			}
			func GetEmail(c *gin.Context) {
				var member entity.Member
				email := c.Param("email")
				
				if err := entity.DB().Raw("SELECT email FROM members WHERE email = ?", email).Scan(&member).Error; err != nil {
					c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
					return
				}
				if(email!=member.Email){
					c.JSON(http.StatusOK, gin.H{"data": member.Email})
					fmt.Println("in it")
					return
				}
				c.JSON(http.StatusOK, gin.H{"data": member.Email})
				fmt.Println("email:",email)
				fmt.Println("email:",member.Email)
			}

func ListServices(c *gin.Context) {
	// รับ ID จากคำขอ HTTP
	id := c.Param("id")

	var services []entity.Service
	if err := entity.DB().
		Preload("Maid").
		Where("id = ?", id).
		Order("id desc").
		Find(&services).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": services})
}
// Ball Function

