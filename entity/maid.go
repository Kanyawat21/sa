package entity

import (

	"gorm.io/gorm"
)

type Maid struct {
	gorm.Model
	FirstName string
	LastName  string
	Tel       string
	Dob       string
	Exp       string
	Address   string
	Status 	  string

	Services []Service `gorm:"foreignKey:MaidID"`
}
