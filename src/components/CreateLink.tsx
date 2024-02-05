import React from "react";
import { api } from "~/utils/api";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "~/components/ui/form";
import { useZodForm } from "~/hooks/useZodForm";
import { z } from "zod";
import { toast } from "sonner";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const createLinkSchema = z.object({
  url: z.string().url(),
});

export function CreateLink() {
  const link = api.links.create.useMutation();
  const context = api.useUtils();
  const methods = useZodForm({
    schema: createLinkSchema,
  });

  const submit = methods.handleSubmit(async (values) => {
    await link.mutateAsync(values);
    await context.links.getAll.invalidate();
    methods.reset({
      url: "",
    });
    toast.success("Link created");
  });

  return (
    <Form {...methods}>
      <form onSubmit={submit}>
        <FormField
          control={methods.control}
          name="url"
          render={({ field }) => (
            <FormItem>
              <FormLabel />
              <FormControl>
                <Input type="text" id="url" placeholder="Url..." {...field} />
              </FormControl>
              <FormMessage />
              <FormDescription />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          Create new short url
        </Button>
      </form>
    </Form>
  );
}
