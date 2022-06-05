# Puzzle

Setup Configuration
```typescript
// puzzle.config.ts
import { Puzzle } from "./puzzle";

Puzzle.createServer({
    port: 3000, //default
    controllerFolder: "./src/controllers/", //default
});
```

Usage
```typescript
// user-controller.ts
import { Controller } from "../controller";
import { route } from "../route";

export default class UserController extends Controller {
    constructor(request: any) {
        super();
        // console.log("User Controller");
    }

    @route({ name: "user.show", url: "/user" })
    public show() {
        return this.render("user.show");
    }

    @route({ name: "user.report", url: "/user/report" })
    public report() {
        return this.render("user.report");
    }
}
```