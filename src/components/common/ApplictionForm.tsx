'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

// Define the schema using zod
const formSchema = z.object({
  title: z.string().min(10, {
    message: 'Title must be at least 10 characters.',
  }),
  subject: z.string().min(10, {
    message: 'subject must be at least 10 characters.',
  }),
  content: z.string().min(50, {
    message: 'Content must be at least 50 characters.',
  }),
  summary: z.string().min(10, {
    message: 'Summary must be at least 10 characters.',
  }),
});

interface ApplicationData {
  title: String;
  subject: String;
  content: String;
  summary: String;
}
const ApplictionForm: React.FC = () => {
  const { toast } = useToast();

  // Initialize the form with useForm and zodResolver
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      subject: '',
      content: '',
      summary: '',
    },
  });

  const { reset } = form;

  const onSubmit = async (data: ApplicationData) => {
    let previousApplications: ApplicationData[] = JSON.parse(
      localStorage.getItem('applications') || '[]',
    );

    previousApplications.push(data);

    localStorage.setItem('applications', JSON.stringify(previousApplications));

    toast({
      variant: 'default',
      description: 'Your application is successfully submitted!',
    });

    reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title *</FormLabel>
              <FormControl>
                <Input
                  placeholder="the manger bali tech, rawalpindi"
                  type="text"
                  {...field}
                />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Subject *</FormLabel>
              <FormControl>
                <Input
                  placeholder="Application for leave due to urgent work at home"
                  type="text"
                  {...field}
                />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content *</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="write reason and request here"
                  {...field}
                />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="summary"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Salutation</FormLabel>
              <FormControl>
                <Textarea placeholder="Sincerly , jalal ud din" {...field} />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default ApplictionForm;
