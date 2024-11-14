import { Mail, Phone } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@hktekno/ui/components/ui/accordion";
import { Button } from "@hktekno/ui/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@hktekno/ui/components/ui/card";
import { Input } from "@hktekno/ui/components/ui/input";
import { Textarea } from "@hktekno/ui/components/ui/textarea";

export default function SupportPage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">Support Center</h1>
      <p className="mb-8 text-lg">
        Welcome to our support center. Here you can find answers to frequently
        asked questions, contact our support team, or access additional
        resources.
      </p>

      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-semibold">
          Frequently Asked Questions
        </h2>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>How do I reset my password?</AccordionTrigger>
            <AccordionContent>
              To reset your password, go to the login page and click on the
              "Forgot Password" link. Follow the instructions sent to your email
              to create a new password.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>
              How can I update my account information?
            </AccordionTrigger>
            <AccordionContent>
              Log in to your account, go to the "Settings" or "Profile" section,
              and you'll find options to update your personal information,
              email, and other account details.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>
              Is there a mobile app available?
            </AccordionTrigger>
            <AccordionContent>
              Yes, we have mobile apps available for both iOS and Android
              devices. You can download them from the App Store or Google Play
              Store by searching for our app name.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>

      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-semibold">Contact Us</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Send us a message</CardTitle>
              <CardDescription>
                We'll get back to you within 24 hours.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <Input placeholder="Your Name" />
                <Input type="email" placeholder="Your Email" />
                <Textarea placeholder="Your Message" />
                <Button className="w-full">Send Message</Button>
              </form>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Other ways to reach us</CardTitle>
              <CardDescription>
                Choose the method that works best for you.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Mail className="h-5 w-5" />
                <span>contact@hktekno.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-5 w-5" />
                <span>0813-1104-8582</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
