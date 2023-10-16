package entity

import "gorm.io/gorm"

type Review struct {
	gorm.Model
	Rate   int
	Detail string

	MemberID *uint
	Member   Member `gorm:"foreignKey:MemberID"`
}
