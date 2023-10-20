package entity

import (
	"gorm.io/gorm"
)

type Service struct {
	gorm.Model
	Has_pet    string
	Pet_detail string
	PickDate       string `gorm:"type:date"`
	PickTime       string `gorm:"type:time"`
	Price float32

	MemberID *uint
	Member   Member `gorm:"foreignKey:MemberID"`

	AccomodationID *uint
	Accomodation  Accomodation `gorm:"foreignKey:AccomodationID"`

	Hour_of_workID *uint
	Hour_of_work   Hour_of_work `gorm:"foreignKey:Hour_of_workID"`

	MaidID *uint
	Maid   Maid `gorm:"foreignKey:MaidID"`


	// Payments []Payment `gorm:"foreignKey:ServiceID"`

	// Histories []History `gorm:"foreignKey:ServiceID"`
}
