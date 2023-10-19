package entity

import (
	"gorm.io/driver/sqlite"

	"gorm.io/gorm"
)

var db *gorm.DB

func DB() *gorm.DB {
	return db
}

func SetupDatabase() {
	database, err := gorm.Open(sqlite.Open("Project.db"), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}
	// Migrate the schema
	database.AutoMigrate(
		&Member{},
		&Maid{},
		&Accomodation{},
		&Hour_of_work{},
		&Report{},
		&Service{},
		&History{},
		&Payment{},
		&Review{},
		
		)
	db = database

	type1 := Accomodation{
		Name_type: "Condo",
		Price: 200,
	}
	db.Model(&Accomodation{}).Create(&type1)

	type2 := Accomodation{
		Name_type: "Home 1 Floor",
		Price: 250,
	}
	db.Model(&Accomodation{}).Create(&type2)

	type3 := Accomodation{
		Name_type: "Home 2-3 Floor",
		Price: 300,
	}
	db.Model(&Accomodation{}).Create(&type3)

	type4 := Accomodation{
		Name_type: "Office",
		Price: 500,
	}
	db.Model(&Accomodation{}).Create(&type4)


	Hour2 := Hour_of_work{
		Hour: "2 Hour",
		Price: 100,
	}
	db.Model(&Hour_of_work{}).Create(&Hour2)

	Hour230 := Hour_of_work{
		Hour: "2 Hour 30 Minute",
		Price: 120,
	}
	db.Model(&Hour_of_work{}).Create(&Hour230)

	Hour3 := Hour_of_work{
		Hour: "3 Hour",
		Price: 140,
	}
	db.Model(&Hour_of_work{}).Create(&Hour3)

	Hour330 := Hour_of_work{
		Hour: "3 Hour 30 Minute",
		Price: 160,
	}
	db.Model(&Hour_of_work{}).Create(&Hour330)

	Hour4 := Hour_of_work{
		Hour: "4 Hour",
		Price: 180,
	}
	db.Model(&Hour_of_work{}).Create(&Hour4)

	Hour5 := Hour_of_work{
		Hour: "5 Hour",
		Price: 200,
	}
	db.Model(&Hour_of_work{}).Create(&Hour5)

	Hour6 := Hour_of_work{
		Hour: "6 Hour",
		Price: 250,
	}
	db.Model(&Hour_of_work{}).Create(&Hour6)

	Hour7 := Hour_of_work{
		Hour: "7 Hour",
		Price: 300,
	}
	db.Model(&Hour_of_work{}).Create(&Hour7)

	maid := Maid{
		FirstName:"hi",
		LastName: "i'maid",
		Tel: "088-5574777",
		Dob:"2023-12-12",
		Exp :"เคยเลี้ยงเด็ก",
		Status: "ว่าง",
	}
	db.Model(&Maid{}).Create(&maid)

	maid1 := Maid{
		FirstName:"melo",
		LastName: "lemon",
		Tel: "123-456789",
		Dob:"2023-12-12",
		Exp :"-",
		Status: "ว่าง",
	}
	db.Model(&Maid{}).Create(&maid1)

	maid2 := Maid{
		FirstName:"plam",
		LastName: "kim",
		Tel: "091-3788549",
		Dob:"1997-05-23",
		Exp :"-",
		Status: "ว่าง",
	}
	db.Model(&Maid{}).Create(&maid2)

	member := Member{
		UserName: "membernaja", 
		FirstName:"na",
		LastName: "ja",
		Email:"kkkkk@gmail.com",
		Password:"00000",
		Tel :"088888888",
		Address :"15 หมู่3 ต.โคกย่าง อ.โคราช จ.นครราชสีมา",
	}
	db.Model(&Member{}).Create(&member)

	s := Service{
		Has_pet: "Yes",
		Pet_detail: "Dog",
		PickDate: "m",
		PickTime: "y",
		Price: 5000,
		Member: member,
		Maid: maid,
		Hour_of_work: Hour4,
		Accomodation: type1,
		
	}
	db.Model(&Service{}).Create(&s)
}

