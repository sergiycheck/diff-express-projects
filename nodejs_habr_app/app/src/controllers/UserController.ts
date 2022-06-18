import "reflect-metadata";
import {
  Controller,
  Param,
  Body,
  Get,
  Post,
  Put,
  Delete,
  UseBefore,
  UseAfter,
  UseInterceptor,
  Action,
  OnUndefined
} from "routing-controllers";
import { loggingAfter, loggingBefore } from "../middleware/middlerare";
import { Info } from "../models/infoModel";

@UseBefore(loggingBefore)
@UseAfter(loggingAfter)
@Controller()
export class UserController {
  @UseBefore(loggingBefore)
  @UseAfter(loggingAfter)
  @Get("/users")
  getAll() {
    return "This action returns all users";
  }

  @UseInterceptor((action: Action, content: any) => {
    console.log("changing response....");
    return content;
  })
  @Get("/users/:id")
  getOne(@Param("id") id: number) {
    return `This action returns user # ${id}`;
  }

  @Post("/users")
  post(@Body() user: any) {
    return "Saving user...";
  }

  // TODO: how to get 204 status code
  @Post("/users/:id")
  @OnUndefined(204)
  postOne(@Param("id") id: number, @Body() info: Info) {
    console.log(JSON.stringify(info));
    return "Ok";
  }

  @Put("/users/:id")
  put(@Param("id") id: number, @Body() user: any) {
    return "Updating a user...";
  }

  @Delete("/users/:id")
  remove(@Param("id") id: number) {
    return "Removing user...";
  }
}
