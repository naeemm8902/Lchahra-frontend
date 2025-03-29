import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import useApiCall from "@/helpers/useApiCall";

const workspaceSchema = z.object({
  name: z.string().min(5, "Workspace name must be at least 5 characters long"),
  description: z.string().min(10, "Description must be at least 10 characters long"),
});

interface AddWorkSpaceFormProps {
  handleCloseForm: () => void;
}

const AddWorkSpaceForm: React.FC<AddWorkSpaceFormProps> = ({ handleCloseForm }) => {
      const { error, isLoading, request } = useApiCall();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(workspaceSchema),
  });

  const onSubmit = async (data: any) => {
    // console.log("Workspace Data:", data);
    // handleCloseForm();
    const token = sessionStorage.getItem('accessToken');
    try {
        const res = await request({
          method: 'POST',
          url: 'workspace',
          data,
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });
        console.log("Workspace response:", res);
  
      } catch (err: any) {
     console.log("Error creating workspace:", err);
      }
  };


  return (
    <Card className="max-w-md w-full p-6 rounded-2xl shadow-lg border border-gray-200 bg-white text-gray-900">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold text-gray-800 text-center">Create Workspace</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <Label htmlFor="name" className="text-gray-700 font-medium text-left">Workspace Name</Label>
            <Input 
              id="name" 
              {...register("name")} 
              aria-invalid={errors.name ? "true" : "false"} 
              className="mt-2 border-gray-300 focus:border-blue-500 focus:ring-blue-500 px-3 py-2 rounded-lg w-full"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
          </div>
          <div>
            <Label htmlFor="description" className="text-gray-700 font-medium text-left">Description</Label>
            <Textarea 
              id="description" 
              {...register("description")} 
              aria-invalid={errors.description ? "true" : "false"} 
              className="mt-2 border-gray-300 focus:border-blue-500 focus:ring-blue-500 px-3 py-2 rounded-lg w-full"
            />
            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
          </div>
          <div className="flex justify-end gap-4 mt-6">
            <Button variant="outline" onClick={handleCloseForm} type="button" className="px-5 py-2.5 text-gray-700 border-gray-300 bg-gray-200 hover:bg-gray-300">Cancel</Button>
            <Button type="submit" className="px-5 py-2.5 bg-blue-600 text-white hover:bg-blue-700">Save Workspace</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddWorkSpaceForm;
