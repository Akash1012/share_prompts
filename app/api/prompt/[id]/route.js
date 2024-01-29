// GET PATCH DELETE

import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const GET = async (request, { params }) => {
  try {
    await connectToDB();

    const prompts = await Prompt.findById(params.id).populate("creator");

    if (!prompts) {
      return new Response("Prompt not found !", { status: 404 });
    }

    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch  prompts", { status: 500 });
  }
};

export const PATCH = async (request, { params }) => {
  const { prompt, tag } = await request.json();

  try {
    await connectToDB();
    const existingPrompts = await Prompt.findById(params.id).populate(
      "creator"
    );

    if (!existingPrompts) {
      return new Response("Prompt not found !", { status: 404 });
    }

    existingPrompts.prompt = prompt;
    existingPrompts.tag = tag;

    await existingPrompts.save();

    return new Response(JSON.stringify(existingPrompts), { status: 200 });
  } catch (error) {
    return new Response("Failed to update prompts", { status: 500 });
  }
};

export const DELETE = async (request, { params }) => {
  try {
    await connectToDB();

    // Find the prompt by ID and remove it
    await Prompt.findByIdAndDelete(params.id);

    return new Response("Prompt deleted successfully", { status: 200 });
  } catch (error) {
    return new Response("Error deleting prompt", { status: 500 });
  }
};
