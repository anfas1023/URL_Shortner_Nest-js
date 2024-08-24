import { Body, Controller, Get, Post } from "@nestjs/common";
import {ShotnerService} from './Shotner.service'
import { Request,Response } from "express";
import { CreateShotnerDto } from "./dto/CreateShotner.dto";



@Controller('shotner')
export class ShotnerController {
    constructor(private Shotnerservive:ShotnerService){}

    @Post('createShotner')
   async createShotner(@Body() createShotnerDto: CreateShotnerDto, req:Request,res:Response) {
    console.log(createShotnerDto);
    
    const createUrl=await this.Shotnerservive.createShotner(createShotnerDto)
    console.log("createUrl",createUrl);
    return createUrl
    }
}