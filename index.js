import readlineSync from "readline-sync";
import colors from "colors";
import openai from "./config/open-ai.js";

const main = async () => {
  console.log(colors.bold.green("Welcome to the chatbot Program"));
  console.log(colors.bold.green("You can start chatting with the bot"));
  const chatHistory = []; //stores convesation history
  while (true) {
    const userInput = readlineSync.question(colors.yellow("You: "));
    try {
      //construct messages by iterating over the history
      const messages = chatHistory.map(([role, content]) => ({
        role,
        content,
      }));
      //add latest user input
      messages.push({ role: "user", content: userInput });
      //call the API with user input & history
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: messages,
      });
      //get completion text/content
      const completionText = completion.choices[0].message.content;
      console.log(colors.green("Bot: ") + completionsText);
      if (userInput.toLowerCase() == "exit") {
        console.log(colors.green("Bot: ") + completionText);
        return;
      }
      // update history with user input and assistant response
      chatHistory.push(["user", userInput]);
      chatHistory.push(["assistant", completionText]);
    } catch (error) {
      console.error(colors.red(error));
    }
  }
};
main();
