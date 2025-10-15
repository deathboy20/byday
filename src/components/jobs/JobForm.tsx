import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createJob } from '@/services/jobService';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { MapPin, Clock, DollarSign, Calendar } from 'lucide-react';

const jobCategories = [
  'Cleaning',
  'Moving & Packing',
  'Delivery',
  'Handyman',
  'Gardening',
  'Painting',
  'Catering',
  'Other',
];

const durationOptions = [
  '1 hour',
  '2 hours',
  '4 hours',
  '1 day',
  'Multiple days',
  'Ongoing',
];

const formSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters'),
  description: z.string().min(20, 'Description must be at least 20 characters'),
  category: z.string().min(1, 'Please select a category'),
  rate: z.number().min(1, 'Please enter a valid rate'),
  duration: z.string().min(1, 'Please select a duration'),
  location: z.object({
    address: z.string().min(1, 'Please enter a valid address'),
    coordinates: z.object({
      lat: z.number(),
      lng: z.number(),
    }),
  }),
  skillsRequired: z.array(z.string()).min(1, 'Please select at least one skill'),
});

type JobFormValues = z.infer<typeof formSchema>;

const skills = [
  'Cleaning',
  'Painting',
  'Plumbing',
  'Electrical',
  'Carpentry',
  'Moving',
  'Gardening',
  'Cooking',
  'Driving',
  'Babysitting',
];

export function JobForm({ onSuccess }: { onSuccess?: () => void }) {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<JobFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      category: '',
      rate: 0,
      duration: '',
      location: {
        address: '',
        coordinates: { lat: 0, lng: 0 },
      },
      skillsRequired: [],
    },
  });

  const { mutate: createJobMutation, isPending } = useMutation({
    mutationFn: async (data: JobFormValues) => {
      if (!user) throw new Error('User not authenticated');
      return createJob(data, user.id);
    },
    onSuccess: () => {
      toast({
        title: 'Job posted successfully!',
        description: 'Your job has been published.',
      });
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
      onSuccess?.();
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: error.message || 'Failed to post job',
        variant: 'destructive',
      });
    },
  });

  const onSubmit = (data: JobFormValues) => {
    createJobMutation(data);
  };

  // This function would be implemented to get user's current location
  const handleGetCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          // In a real app, you would reverse geocode these coordinates to get an address
          form.setValue('location.coordinates', { lat: latitude, lng: longitude });
          form.setValue('location.address', 'Current Location');
        },
        (error) => {
          toast({
            title: 'Location Error',
            description: 'Could not get your location. Please enter it manually.',
            variant: 'destructive',
          });
        }
      );
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Job Title</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Need a painter for my living room" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe the job in detail..."
                  className="min-h-[120px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {jobCategories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="duration"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Duration</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="How long will it take?" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {durationOptions.map((duration) => (
                      <SelectItem key={duration} value={duration}>
                        {duration}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="rate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Rate (GH₵)</FormLabel>
                <FormControl>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="number"
                      placeholder="0.00"
                      className="pl-8"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="location.address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <div className="flex space-x-2">
                <FormControl>
                  <div className="relative flex-1">
                    <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Enter location or click to use current location"
                      className="pl-8"
                      {...field}
                    />
                  </div>
                </FormControl>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={handleGetCurrentLocation}
                >
                  <MapPin className="h-4 w-4" />
                </Button>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="skillsRequired"
          render={() => (
            <FormItem>
              <FormLabel>Required Skills</FormLabel>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <Button
                    type="button"
                    key={skill}
                    variant={
                      form.watch('skillsRequired')?.includes(skill)
                        ? 'default'
                        : 'outline'
                    }
                    size="sm"
                    onClick={() => {
                      const currentSkills = form.getValues('skillsRequired') || [];
                      const newSkills = currentSkills.includes(skill)
                        ? currentSkills.filter((s) => s !== skill)
                        : [...currentSkills, skill];
                      form.setValue('skillsRequired', newSkills);
                    }}
                  >
                    {skill}
                  </Button>
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? 'Posting...' : 'Post Job'}
        </Button>
      </form>
    </Form>
  );
}
