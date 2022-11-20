// To authenticate and generate JWT
export interface IUser {
    user_id:string
    fullname: string,
    email: string,
    password: string
}
// User's Goals
export interface IGoal {
    user_id: string, // from JWT, ObjectId()
    title: string,
    description: string,
    deadline:string, // timestamp
    steps: IStep[]
}

export interface IStep {
    title: string,
    description: string,
    status: string,
    deadline: string, // timestamp
}