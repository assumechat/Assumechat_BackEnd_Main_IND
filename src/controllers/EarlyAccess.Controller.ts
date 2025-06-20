import { NextFunction, Request, RequestHandler, Response } from "express";
import EarlyAccessFormModel from "../models/EarlyAccessForm.Model";
import { sendError, sendSuccess } from "../utils/apiResponse";
import { IIT_EMAIL_DOMAINS, IIT_EMAIL_MAP } from "../common/iit_email.common";

//check if the user already exists it returns a boolean
async function checkEmail(email: string): Promise<boolean> {
  const user = await EarlyAccessFormModel.findOne({ email });
  if (!user) {
    return false;
  }
  return true;
}
//all the iit email domains

//check if the email for early acess is iit email or not
function isIITEmail(email: string): boolean {
  const domain = email.split("@")[1]?.toLowerCase();
  return IIT_EMAIL_DOMAINS.includes(domain);
}

function whichIIT(email: string): string | null {
  const domain = email.split("@")[1]?.toLowerCase();

  return domain && IIT_EMAIL_MAP[domain] ? IIT_EMAIL_MAP[domain] : null;
}

//post early access form
export const PostForm: RequestHandler<{ id: string }> = async (
  req,
  res,
  next
) => {
  try {
    const { email, name } = req.body;
    if (!email || !name) {
      return sendError(res, "Please provide all the required fields", 401);
    }
    const checkUser = await checkEmail(email);
    if (checkUser) {
      return sendError(res, "You have already signed up for early access", 401);
    }
    const numUser = await EarlyAccessFormModel.countDocuments({});
    if (numUser >= 100) {
      return sendError(
        res,
        "Early access limit has been hit we will open the forms again soon",
        400
      );
    }

    if (!isIITEmail(email)) {
      return sendError(
        res,
        "Signup is restricted to users with a valid IIT  email address",
        401
      );
    }
    const whichiit = whichIIT(email);
    const newUser = await EarlyAccessFormModel.create({
      email,
      name,
      whichIIT: whichiit,
    });
    return sendSuccess(res, newUser, "Form submitted successfully", 200);
  } catch (e: any) {
    return sendError(res, e.message || "Something went wrong", 500, e);
  }
};
//get all the forms submitted
export const GetAllForms: RequestHandler<{ id: string }> = async (
  req,
  res,
  next
) => {
  try {
    const forms = await EarlyAccessFormModel.find({});
    if (!forms || forms.length == 0) {
      return sendError(res, "no forms found", 404);
    }
    return sendSuccess(res, forms, "got all the forms", 200);
  } catch (error: any) {
    return sendError(res, error.message || "Something went wrong", 500, error);
  }
};
export const getNumForms: RequestHandler<{ id: string }> = async (
  req,
  res,
  next
) => {
  try {
    const number = await EarlyAccessFormModel.countDocuments({});

    return sendSuccess(res, number, "got Number of applications", 200);
  } catch (error: any) {
    return sendError(res, error.message || "Something went wrong", 500);
  }
};
export const getUserByEmail: RequestHandler<{ id: string }> = async (
  req,
  res,
  next
) => {
  try {
    const { email } = req.body;
    if (!email) {
      return sendError(res, "Please provide all the required fields", 400);
    }
    const user = await EarlyAccessFormModel.findOne({ email: email });

    if (!user) {
      return sendError(res, "user not found", 404);
    }
    return sendSuccess(res, user, "user found", 200);
  } catch (error: any) {
    return sendError(res, error.message || "Something went wrong", 500, error);
  }
};
export const accessClaimed: RequestHandler<{ id: string }> = async (
  req,
  res,
  next
) => {
  try {
    const { id } = req.body;
    if (!id) {
      return sendError(res, "Please provide all the required fields", 400);
    }
    const update = await EarlyAccessFormModel.findByIdAndUpdate(
      { _id: id },
      { claimed: true }
    );
    if (!update) {
      return sendError(res, "Error updating", 404);
    }
    const user = await EarlyAccessFormModel.findOne({ _id: id });
    return sendSuccess(res, user, "user found", 200);
  } catch (error: any) {
    return sendError(res, error.message || "Something went wrong", 500, error);
  }
};
