db.createCollection( "students", {
    validator: { $jsonSchema: {
       bsonType: "object",
       required: [ "lastname","firstname","email","phone","validated","admin" ],
       properties: {
            lastname: {
                bsonType: "string",
                description: "must be a string and is required"
            },
            firstname: {
                bsonType: "string",
                description: "must be a string and is required"
            },
            email: {
                bsonType : "string",
                pattern : "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$",
                description: "must be a string and match the regular expression pattern"
            },
            phone: {
                bsonType : "string",
                pattern : "^0[1-9]([0-9]{2}){4}$",
                description: "must be an string and match the regular expression pattern"
            },
            validated: {
                enum: [ "in progress", "validated" , "rejected"],
                description: "can only be one of the enum values"
            },
            admin: {
                bsonType: "bool",
                description: "must be a bool and is required"
            }
        }
    }}
});
db.students.insert(
    { lastname: "Poulet", 
      firstname: "Bilal", 
      email: "test@gmail.com",
      phone : "0678978321",
      validated: "validated",
      admin: true,
    }
 );
 db.students.find({}).pretty()