package entity

import (
	"gorm.io/gorm"
)

type Member struct {
	gorm.Model
	UserName  string `gorm:"uniqueIndex"`
	Password  string
	FirstName string
	LastName  string
	Email     string `gorm:"uniqueIndex"`
	Tel       string
	Address   string
	
	
	// Reports  []Report  `gorm:"foreignKey:MemberID"`
	// Services []Service `gorm:"foreignKey:MemberID"`
}
