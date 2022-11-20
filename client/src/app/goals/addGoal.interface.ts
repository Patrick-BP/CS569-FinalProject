export interface IAddGoal {
    _id:string,
    user_id: string, // from JWT, ObjectId()
    title: string,
    description: string,
    deadline:string, // timestamp
    steps: IStep[]
}

export interface IStep {
    _id:string,
    title: string,
    description: string,
    status: string,
    deadline: string, // timestamp
}