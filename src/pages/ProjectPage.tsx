import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Home, Plus, Rss, Youtube, Upload, ChevronRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';

const ProjectPage = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  
  // Fetch project from localStorage
  const projects = JSON.parse(localStorage.getItem('projects') || '[]');
  const project = projects.find((p: any) => p.id === projectId);
  
  if (!project) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-2xl font-bold">Project not found</h1>
        <Button 
          onClick={() => navigate('/landing')}
          className="mt-4"
        >
          Go Back
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center text-sm text-gray-500 mb-6">
          <Link to="/landing" className="flex items-center hover:text-purple-600">
            <Home className="h-4 w-4 mr-1" />
            Home Page
          </Link>
          <ChevronRight className="h-4 w-4 mx-2" />
          <span className="text-gray-700">{project.name}</span>
          <ChevronRight className="h-4 w-4 mx-2" />
          <span className="text-purple-600">Add your podcast</span>
        </div>
        
        <h1 className="text-3xl font-bold mb-8">Add Podcast</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="flex flex-col items-center p-6">
              <div className="mb-4 text-orange-500">
                <Rss className="h-16 w-16" />
              </div>
              <h2 className="text-xl font-semibold mb-2">RSS Feed</h2>
              <p className="text-gray-500 text-center">Lorem ipsum dolor sit. Dolor lorem sit.</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="flex flex-col items-center p-6">
              <div className="mb-4 text-red-500">
                <Youtube className="h-16 w-16" />
              </div>
              <h2 className="text-xl font-semibold mb-2">Youtube Video</h2>
              <p className="text-gray-500 text-center">Lorem ipsum dolor sit. Dolor lorem sit.</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="flex flex-col items-center p-6">
              <div className="mb-4 text-purple-500">
                <Upload className="h-16 w-16" />
              </div>
              <h2 className="text-xl font-semibold mb-2">Upload Files</h2>
              <p className="text-gray-500 text-center">Lorem ipsum dolor sit. Dolor lorem sit.</p>
            </CardContent>
          </Card>
        </div>
        
        <Card className="mb-8">
          <CardContent className="flex flex-col items-center py-16">
            <div className="text-purple-600 mb-4">
              <svg className="h-20 w-20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 16.5V14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M16 16.5H8C6.59 16.5 5.5 15.41 5.5 14V8C5.5 6.59 6.59 5.5 8 5.5H16C17.41 5.5 18.5 6.59 18.5 8V14C18.5 15.41 17.41 16.5 16 16.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M22 12L21 16H3L2 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 5.5V2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M15 3.5L12 2L9 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h2 className="text-xl font-semibold mb-2">Select a file or drag and drop here (Podcast Media or Transcription Text)</h2>
            <p className="text-gray-500 mb-6">MP4, MOV, MP3, WAV, PDF, DOCX or TXT file</p>
            <Button variant="outline" className="border-purple-600 text-purple-600 hover:bg-purple-50">
              Select File
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProjectPage;
