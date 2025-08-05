'use server';
/**
 * @fileOverview An AI chatbot for Tendani Holdings that answers FAQs, recommends services, and provides site navigation.
 *
 * - aiChatbot - A function that handles the chatbot interaction.
 * - AIChatbotInput - The input type for the aiChatbot function.
 * - AIChatbotOutput - The return type for the aiChatbot function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AIChatbotInputSchema = z.object({
  message: z.string().describe('The user message to the chatbot.'),
  conversationHistory: z.array(z.object({
    role: z.enum(['user', 'bot']),
    content: z.string(),
  })).optional().describe('The conversation history between the user and the bot.'),
});
export type AIChatbotInput = z.infer<typeof AIChatbotInputSchema>;

const AIChatbotOutputSchema = z.object({
  response: z.string().describe('The chatbot response to the user message.'),
});
export type AIChatbotOutput = z.infer<typeof AIChatbotOutputSchema>;

export async function aiChatbot(input: AIChatbotInput): Promise<AIChatbotOutput> {
  return aiChatbotFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiChatbotPrompt',
  input: {schema: AIChatbotInputSchema},
  output: {schema: AIChatbotOutputSchema},
  prompt: `You are a helpful AI chatbot for Tendani Holdings, a cleaning and gardening company. Your goal is to answer user questions about the company and its services, recommend relevant services, and guide users through the website.

  Here are some FAQs and information about Tendani Holdings:
  - Tendani Holdings offers cleaning and gardening services.
  - We are committed to providing high-quality services.
  - We have a gallery showcasing our completed work.
  - You can contact us through the contact form on our website.

  Here are the services we offer:
  - Cleaning: We offer comprehensive cleaning services for residential and commercial properties.
  - Gardening: We provide professional gardening services to maintain and enhance your outdoor spaces.

  Here are some guiding principles:
  - If the user asks about the company or its mission, provide information from the "About" section.
  - If the user asks about specific services, recommend the relevant service and provide a brief description.
  - If the user is looking for examples of completed work, guide them to the "Gallery" section.
  - If the user wants to contact Tendani Holdings, guide them to the "Contact" section.

  Conversation History:
  {{#each conversationHistory}}
  {{#if (eq role "user")}}
  User: {{{content}}}
  {{else}}
  Bot: {{{content}}}
  {{/if}}
  {{/each}}

  User Message: {{{message}}}
  Chatbot:`, // Ensure Handlebars syntax is correct
});

const aiChatbotFlow = ai.defineFlow(
  {
    name: 'aiChatbotFlow',
    inputSchema: AIChatbotInputSchema,
    outputSchema: AIChatbotOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
