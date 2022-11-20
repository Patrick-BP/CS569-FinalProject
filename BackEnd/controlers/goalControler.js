const { ObjectId } = require("mongodb");
const goalModel = require("../models/goalModel");

exports.getGoalsByUser = async (req, res) => {
  try {
    const user_id = ObjectId(req.params.user_id) ;
  
    const result = await goalModel.find({user_id:user_id});
    res.json({ success: 1, data: result });
  } catch (e) {
    res.json({ success: 0, error: "can't get all goals" });
  }
};

exports.getGoalById = async (req, res) => {
  try {
    const result = await goalModel.findOne(ObjectId(req.params.goal_id));
    res.json({ success: 1, data: result});
  } catch (e) {
    res.json({ success: 0, error: "can't get  goal" });
  }
};

exports.addGoals = async (req, res) => {
  try {
    const result = await goalModel.create(req.body);
    res.json({ success: 1, data: result });
  } catch (e) {
    res.json({ success: 0, error: "can't add  goal" });
  }
};

exports.updateGoal = async (req, res) => {
  try {
    const { user_id, title, description, deadline } = req.body;
    const result = await goalModel.updateOne(
      { _id: new ObjectId(req.params.goal_id) },
      { $set: { user_id, title, description, deadline } }
    );
    res.json({ success: 1, data: result });
  } catch (e) {
    res.json({ success: 0, error: "can't update all goal" });
  }
};

exports.deleteGoal = async (req, res) => {
  try {
    const result = await goalModel.deleteOne({
      _id: ObjectId(req.params.goal_id),
    });
    res.json({ success: 1, data: result });
  } catch (e) {
    res.json({ success: 0, error: "can't delete  goal" });
  }
};

//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

exports.getStepById = async(req, res)=>{
  try {
    const step_id =req.params.step_id ;
    const result = await goalModel.findOne({"steps._id":step_id});
    
    res.json({ success: 1, data: result.steps.filter((elem)=>elem._id == step_id) });
  } catch (e) {
    res.json({ success: 0, error: "can't get step" });
  }
}
exports.addSteps = async (req, res) => {
  try {
    const result = await goalModel.updateOne(
      { _id: ObjectId(req.params.goal_id) },
      { $push: { steps: req.body } }
    );
    res.json({ success: 1, data: result });
  } catch (e) {
    res.json({ success: 0, error: "can't add steps" });
  }
};

exports.getAllSteps = async (req, res) => {
  try {
    const result = await goalModel.findOne(
      { _id: ObjectId(req.params.goal_id) },
      {
        steps: 1,
      }
    );
    res.json({ success: 1, data: result });
  } catch (e) {
    res.json(e.message);
    //   res.json({ success: 0, error: "can't get all  steps" });
  }
};

exports.stepsUpdate = async (req, res) => {
  try {
    const step_id = req.params.step_id;
    const { title, description, status, deadline } = req.body;
    const result = await goalModel.updateOne(
      { _id: ObjectId(req.params.goal_id), "steps._id": step_id },
      {
        $set: {
          "steps.$.title": title,
          "steps.$.description": description,
          "steps.$.status": status,
          "steps.$.deadline": deadline,
        },
      }
    );
    res.json({ success: 1, data: result });
  } catch (e) {
    res.json({ success: 0, error: "can't update  steps" });
  }
};

exports.stepsDelete = async (req, res) => {
  try {
    const result = await goalModel.updateOne(
      { _id: ObjectId(req.params.goal_id) },
      {
        $pull: { steps: { _id: ObjectId(req.params.step_id) } },
      }
    );
    res.json({ success: 1, data: result });
  } catch (e) {
    res.json({ success: 0, error: "can't delete  step" });
  }
};
