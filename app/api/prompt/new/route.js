import { Prompt } from "@/models/prompt";
import { User } from "@/models/user";
import connectDB from "@/utils/database";

export const POST = async (req) => {
  const { userId, prompt, tag } = await req.json();

  try {
    await connectDB();
    const newPrompt = new Prompt({
      creator: userId,
      prompt,
      tag,
    });
    await newPrompt.save();

    // message to show username of the user who created the prompt
    const user = await User.findById(userId);
    console.log("New Prompt Created By: ", user.username);

    return new Response(JSON.stringify(newPrompt), { status: 201 });
  } catch (error) {
    return new Response("Failed to create a new prompt ", { status: 500 });
  }
};
