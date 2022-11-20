const express = require("express");

const goalsControl = require("../controlers/goalControler");

const router = express.Router();

router.get("/:user_id", goalsControl.getGoalsByUser);
router.get("/:goal_id/goal", goalsControl.getGoalById);
router.post("/", goalsControl.addGoals);
router.patch("/:goal_id", goalsControl.updateGoal);
router.delete("/:goal_id", goalsControl.deleteGoal);
router.get("/:goal_id/steps", goalsControl.getAllSteps);
router.get("/step/:step_id", goalsControl.getStepById);
router.patch("/:goal_id/steps", goalsControl.addSteps);
router.patch("/:goal_id/steps/:step_id", goalsControl.stepsUpdate);
router.delete("/:goal_id/steps/:step_id", goalsControl.stepsDelete);

module.exports = router;
