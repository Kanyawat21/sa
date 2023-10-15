package entity

import (
	"time"

	"gorm.io/gorm"
)

type Payment struct {
	gorm.Model
	Receipt string
	Date    time.Time

	ServiceID *uint
	Service   Service `gorm:"foreignKey:ServiceID"`

	//Histories []History `gorm:"foreignKey:PaymentID"`
}
