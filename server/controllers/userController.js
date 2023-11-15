const { User } = require("../models")
const { comparePassword} = require("../helpers/bcrypt")
const { signToken } = require("../helpers/jwt")


class Controller {

    static async addUser(req, res, next) {
        try {
         const {email, password, phoneNumber, username} = req.body
        console.log(req.body)

         
            // const hashesPassword = hashPassword(password)

            const user = await User.create({email, password , phoneNumber, username})
            res.status(201).json({
                username : user.username,
                phoneNumber : user.phoneNumber,
            })
      
        } catch (error) {
            console.log("error register >>>>>>",error.name)
            next(error)
            
            // if(error.name === 'SequelizeValidationError') {
            //     return res.status(400).json({message: error.errors[0].message})
            // }
            
            // console.log(error.name)
            // res.status(500).json({message: "Internal server error"})
        }
    }

    static async login(req, res, next) {
        try {
            const { email, password } =req.body
            console.log( email, password)
            if(!email || !password) {
                throw { name : 'EmailPasswordNull'}
            }
            const user = await User.findOne({where: {email} })
            if(!user) {
                throw { name : 'EmailInvalid'}
            }
            // console.log(user.id)

            const isValidPassword = comparePassword(password, user.password)
            if(!isValidPassword) {
                throw { name: 'PasswordInvalid'}
            }

            const access_token = signToken({ id: user.id })
            res.status(200).json({ access_token })
        } catch (error) {
            next(error)
            console.log(error)
            // console.log(error.name)
            // res.status(500).json({message: "Internal server error"})

        }
    }
}

module.exports = Controller