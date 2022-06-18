import { Router, Response, Request } from "express";
import { PostEntity } from "../database/entities/post.entity";
import { PostService } from "../services/post.service";

export class PostController {
  public router: Router;
  private postService: PostService;

  constructor() {
    this.postService = new PostService();
    this.router = Router();
    this.routes();
  }

  public index = async (req: Request, res: Response) => {
    const posts = await this.postService.index();
    res.json(posts);
  };

  public create = async (req: Request, res: Response) => {
    const post = req["body"] as PostEntity;
    const newPost = await this.postService.create(post);
    res.json(newPost);
  };

  public update = async (req: Request, res: Response) => {
    const post = req["body"] as PostEntity;
    const id = req["params"]["id"];
    const updatedPost = await this.postService.update(post, id);

    res.json(updatedPost);
  };

  public delete = async (req: Request, res: Response) => {
    const id = req["params"]["id"];
    const deletedRes = await this.postService.delete(id);
    res.json(deletedRes);
  };

  public routes() {
    this.router.get("/", this.index);
    this.router.post("/", this.create);
    this.router.put("/:id", this.update);
    this.router.delete("/:id", this.delete);
  }
}
