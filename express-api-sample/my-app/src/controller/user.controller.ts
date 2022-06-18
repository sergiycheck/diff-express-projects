import { Router, Response, Request, NextFunction } from "express";
import { UserEntity } from "../database/entities/user.entity";
import { UserService } from "../services/user.service";
import { UserValidator } from "./user.validator";

type paginationParams = Request["query"] & {
  from: number;
  to: number;
};

export class UserController {
  public router: Router;
  private userService: UserService;
  private userValidator: UserValidator;

  constructor() {
    this.userService = new UserService();
    this.userValidator = new UserValidator();
    this.router = Router();

    this.routes();
  }

  private getNormalizedParams = (req: Request) => {
    const queryParams = req.query as paginationParams;
    const normalizedParams = Object.values(queryParams).map((p) =>
      isNaN(Number(p)) ? 0 : Number(p)
    );
    return normalizedParams;
  };

  public listUsers = async (req: Request, res: Response) => {
    const users = await this.userService.listUsers(
      ...this.getNormalizedParams(req)
    );
    res.json(users);
  };

  public listFullNames = async (req: Request, res: Response) => {
    const users = await this.userService.listFullNames(
      ...this.getNormalizedParams(req)
    );

    res.json(users);
  };

  public create = async (req: Request, res: Response, next: NextFunction) => {
    const user = req["body"] as UserEntity;
    const newUser = await this.userService.create(user);
    res.json(newUser);
  };

  public update = async (req: Request, res: Response, next: NextFunction) => {
    const user = req["body"] as UserEntity;
    const id = req["params"]["id"];
    const updatedUser = await this.userService.update(user, id);

    res.json(updatedUser);
  };

  public delete = async (req: Request, res: Response, next: NextFunction) => {
    const id = req["params"]["id"];
    const deletedRes = await this.userService.delete(id);
    res.json(deletedRes);
  };

  public routes() {
    this.router.post(`/`, this.userValidator.validateAge);
    this.router.put(`/:id`, this.userValidator.validateAge);
    this.router.delete(`/:id`, this.userValidator.validateAge);

    this.router.get("/", this.listUsers);
    this.router.get("/fullnames", this.listFullNames);

    this.router.post("/", this.create);
    this.router.put("/:id", this.update);
    this.router.delete("/:id", this.delete);
  }
}
