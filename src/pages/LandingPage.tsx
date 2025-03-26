
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { CirclePlus, Folder } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import CreateProjectModal from '@/components/CreateProjectModal';
import Navbar from '@/components/Navbar';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";

interface Project {
  id: string;
  name: string;
  createdAt: string;
  userId: string;
}

const LandingPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    // Load projects from localStorage
    const storedProjects = JSON.parse(localStorage.getItem('projects') || '[]');
    // Filter projects by current user if user exists
    const userProjects = user?.id 
      ? storedProjects.filter((project: Project) => project.userId === user.id)
      : [];
    
    setProjects(userProjects);
  }, [user]);

  const handleCreateProject = (projectName: string) => {
    // Create a simple project model
    const newProject = {
      id: Date.now().toString(),
      name: projectName,
      createdAt: new Date().toISOString(),
      userId: user?.id
    };
    
    // In a real app, this would make an API call to create a project
    // For now, we'll create a mock project in localStorage
    const existingProjects = JSON.parse(localStorage.getItem('projects') || '[]');
    const updatedProjects = [...existingProjects, newProject];
    localStorage.setItem('projects', JSON.stringify(updatedProjects));
    
    // Update local state
    setProjects([...projects, newProject]);
    
    // Show success toast
    toast.success(`Project ${projectName} created successfully!`);
    
    // Close modal and redirect to the new project page
    setIsModalOpen(false);
    navigate(`/project/${newProject.id}`);
  };

  const handleProjectClick = (projectId: string) => {
    navigate(`/project/${projectId}`);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-purple-600">Your Projects</h1>
          
          <Button 
            onClick={() => setIsModalOpen(true)}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-md text-lg"
          >
            <CirclePlus className="mr-2 h-5 w-5" /> Create New Project
          </Button>
        </div>
        
        {projects.length === 0 ? (
          <Card className="border-2 border-dashed border-gray-200 p-8">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Folder className="h-16 w-16 text-gray-300 mb-4" />
              <h2 className="text-xl font-medium text-gray-600 mb-4">No projects yet</h2>
              <p className="text-gray-500 mb-6 text-center max-w-md">
                Create your first project to get started. Projects help you organize your podcasts.
              </p>
              <Button
                onClick={() => setIsModalOpen(true)}
                className="bg-purple-600 hover:bg-purple-700"
              >
                <CirclePlus className="mr-2 h-4 w-4" /> Create New Project
              </Button>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>All Projects ({projects.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Project Name</TableHead>
                    <TableHead>Created On</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {projects.map((project) => (
                    <TableRow key={project.id} className="cursor-pointer hover:bg-gray-50">
                      <TableCell className="font-medium" onClick={() => handleProjectClick(project.id)}>
                        <div className="flex items-center">
                          <Folder className="h-5 w-5 text-purple-500 mr-2" />
                          {project.name}
                        </div>
                      </TableCell>
                      <TableCell onClick={() => handleProjectClick(project.id)}>
                        {formatDate(project.createdAt)}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button 
                          variant="ghost" 
                          onClick={() => handleProjectClick(project.id)}
                          className="text-purple-600 hover:text-purple-800 hover:bg-purple-50"
                        >
                          Open
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}

        <CreateProjectModal 
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onCreateProject={handleCreateProject}
        />
      </main>
    </div>
  );
};

export default LandingPage;
