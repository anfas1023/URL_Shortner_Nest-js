import { Body, Controller, Get, Post, Req, Res, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { UserService } from "./User.service";
import { UserDto } from "./dto/User.dto";
import { loginuserDto } from "./dto/loginuserDto.dto";
import { Request, Response } from "express";
import { LocalGuard } from "./guard/local.guard";
import { JwtGuard } from "./guard/Jwt.guard";


@Controller('user')
export class UserController {
constructor(private userservice:UserService) {}

@Post('registerUser')
@UsePipes(new ValidationPipe)
createUser(@Body() UserDto:UserDto){
console.log(UserDto);
return this.userservice.Createuser(UserDto)
}

@Post('login')
@UsePipes(new ValidationPipe)
@UseGuards(LocalGuard)
async loginUser(@Req() req:Request,@Res() res:Response){
    const userId=req.user
    console.log("userId",userId);
    
    const {token,message}= await this.userservice.loginUser(userId)

    res.cookie('auth_token', token, {
        httpOnly: true, 
        maxAge: 3600000, 
      });

      return res.status(200).json({token,message,userId})
}


@Get('status')
@UseGuards(JwtGuard)
async checkStatus(@Req() req:Request){
  console.log('Inside AuthController status method');
  console.log(req.user);
return req.user
}


@Post('logout')
async logout(@Req() req :Request, @Res() res:Response) {
  // Invalidate session or JWT on the server side
  console.log("sucess");
  
  res.clearCookie('auth_token'); // If you're using cookies
  res.status(200).send({ message: 'Logged out successfully' });
}
}