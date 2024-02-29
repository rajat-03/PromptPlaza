import { Prompt } from "@/models/prompt";
import connectDB from "@/utils/database";

// GET=> /api/prompt/:id
export const GET = async (req, { params }) => {
  try {
    await connectDB();
    const prompt = await Prompt.findById(params.id).populate("creator");

    if (!prompt) {
      return new Response("Prompt not found", { status: 404 });
    }

    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch posts ", { status: 500 });
  }
};

//(UPDATE) PATCH => /api/prompt/:id
export const PATCH = async (req, { params }) => {
  const { prompt, tag } = await req.json();

  try {
    await connectDB();

    const existingPrompt = await Prompt.findById(params.id);
    if (!existingPrompt) {
      return new Response("Prompt not found", { status: 404 });
    }

    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;
    await existingPrompt.save();

    return new Response(JSON.stringify(existingPrompt), { status: 200 });
  } catch (error) {
    return new Response("Failed to update prompt", { status: 500 });
  }
};

// DELETE => /api/prompt/:id
export const DELETE = async (req, { params }) => {
  try {
    await connectDB();
    const prompt = await Prompt.findByIdAndDelete(params.id);
    if (!prompt) {
      console.log("Prompt not found")
      return new Response("Prompt not found", { status: 404 });
    }
    console.log("Prompt Deleted Successfully")
    return new Response("Prompt Deleted Successfully", { status: 200 });
  } catch (error) {
    return new Response("Failed to delete prompt", { status: 500 });
  }
};
