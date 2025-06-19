import { NextFunction, Request, RequestHandler, Response } from "express";
import EarlyAccessFormModel from "../models/EarlyAccessForm.Model";
import { sendError, sendSuccess } from "../utils/apiResponse";

async function checkEmail(email: string): Promise<boolean> {
  const user = await EarlyAccessFormModel.findOne({ email });
  if (!user) {
    return false;
  }
  return true;
}
const IIT_EMAIL_DOMAINS = [
  "iitb.ac.in", // IIT Bombay
  "iitd.ac.in", // IIT Delhi
  "iitk.ac.in", // IIT Kanpur
  "iitm.ac.in", // IIT Madras
  "iitkgp.ac.in", // IIT Kharagpur
  "iitr.ac.in", // IIT Roorkee
  "iitg.ac.in", // IIT Guwahati
  "iith.ac.in", // IIT Hyderabad
  "iitbbs.ac.in", // IIT Bhubaneswar
  "iitgn.ac.in", // IIT Gandhinagar
  "iitj.ac.in", // IIT Jodhpur
  "iitp.ac.in", // IIT Patna
  "iitrpr.ac.in", // IIT Ropar
  "iiti.ac.in", // IIT Indore
  "iitmandi.ac.in", // IIT Mandi
  "iitism.ac.in", // IIT (ISM) Dhanbad
  "iitpkd.ac.in", // IIT Palakkad
  "iittp.ac.in", // IIT Tirupati
  "iitbhilai.ac.in", // IIT Bhilai
  "iitgoa.ac.in", // IIT Goa
  "iitjammu.ac.in", // IIT Jammu
  "iitdh.ac.in", // IIT Dharwad
];
function isIITEmail(email: string): boolean {
  const domain = email.split("@")[1]?.toLowerCase();
  return IIT_EMAIL_DOMAINS.includes(domain);
}
export const PostForm: RequestHandler<{ id: string }> = async (
  req,
  res,
  next
) => {
  try {
    const { email, name, whichIIT } = req.body;
    if (!email || !name || !whichIIT) {
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
    const newUser = await EarlyAccessFormModel.create({
      email,
      name,
      whichIIT,
    });
    return sendSuccess(res, newUser, "Form submitted successfully", 200);
  } catch (e: any) {
    return sendError(res, e.message || "Something went wrong", 500, e);
  }
};
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
