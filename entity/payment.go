package entity

import (
	"time"

	"gorm.io/gorm"
)

type Payment struct {
	gorm.Model
	Receipt string `gorm:"type:longtext"`
	Date    time.Time

	ServiceID *uint
	Service   Service `gorm:"foreignKey:ServiceID"`

	MemberID *uint
	Member	Member `gorm:"foreignKey:MemberID"`
	MemberFirstName string
	MemberLastName string

	//Histories []History `gorm:"foreignKey:PaymentID"`
}
