
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/auth';
import { Layout } from '@/components/layout/Layout';
import { Helmet } from 'react-helmet';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LoginForm } from '@/components/auth/LoginForm';
import { SignupForm } from '@/components/auth/SignupForm';
import { SocialAuth } from '@/components/auth/SocialAuth';
import { AuthCardFooter } from '@/components/auth/AuthCardFooter';

const Auth = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>("login");
  
  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);
  
  return (
    <Layout title="Authentication">
      <Helmet>
        <title>Sign In | Mission Planner Pro</title>
      </Helmet>
      <div className="container max-w-md mx-auto py-10">
        <Card className="border shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Welcome</CardTitle>
            <CardDescription className="text-center">
              Sign in to your account or create a new one
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>
              
              <TabsContent value="login" className="mt-4">
                <LoginForm onSuccess={() => navigate('/')} />
                <SocialAuth authType="login" />
              </TabsContent>
              
              <TabsContent value="signup" className="mt-4">
                <SignupForm onSuccess={() => setActiveTab("login")} />
                <SocialAuth authType="signup" />
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter>
            <AuthCardFooter activeTab={activeTab} onTabChange={setActiveTab} />
          </CardFooter>
        </Card>
      </div>
    </Layout>
  );
};

export default Auth;
