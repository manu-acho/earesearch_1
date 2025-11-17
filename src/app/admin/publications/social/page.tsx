"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Plus, Search, Edit, Trash2, ExternalLink, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type SocialPost = {
  id: number;
  title: string;
  platform: string;
  postUrl: string;
  excerpt: string | null;
  publishedDate: string;
  tags: string[];
  engagement: number | null;
  featured: boolean;
  createdAt: string;
};

const platformIcons = {
  linkedin: Linkedin,
  twitter: Twitter,
  medium: ExternalLink,
};

const platformColors = {
  linkedin: "bg-blue-500/10 text-blue-700 border-blue-500/20",
  twitter: "bg-sky-500/10 text-sky-700 border-sky-500/20",
  medium: "bg-gray-500/10 text-gray-700 border-gray-500/20",
};

export default function AdminSocialPostsPage() {
  const router = useRouter();
  const [posts, setPosts] = useState<SocialPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [platformFilter, setPlatformFilter] = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch('/api/publications/social');
      if (response.ok) {
        const data = await response.json();
        setPosts(data);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching posts:", error);
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`/api/publications/social/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setPosts(posts.filter((p) => p.id !== id));
        setDeleteConfirm(null);
      } else {
        alert("Failed to delete post");
      }
    } catch (error) {
      console.error("Error deleting post:", error);
      alert("Failed to delete post");
    }
  };

  const filteredPosts = posts.filter((post) => {
    const matchesSearch = !searchQuery || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (post.excerpt && post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesPlatform = !platformFilter || post.platform === platformFilter;

    return matchesSearch && matchesPlatform;
  });

  const platforms = Array.from(new Set(posts.map(p => p.platform)));

  return (
    <div className="container py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">Social Media Posts</h1>
          <p className="text-muted-foreground">
            Manage posts from LinkedIn, Twitter/X, Medium, and other platforms
          </p>
        </div>
        <Button className="glossy-blue glossy-blue-hover" asChild>
          <Link href="/admin/publications/social/new">
            <Plus className="w-4 h-4 mr-2" />
            Add Post
          </Link>
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="mb-6">
        <div className="flex gap-4 mb-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search posts by title or excerpt..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Badge
            variant={platformFilter === null ? "default" : "outline"}
            className="cursor-pointer"
            onClick={() => setPlatformFilter(null)}
          >
            All ({posts.length})
          </Badge>
          {platforms.map((platform) => (
            <Badge
              key={platform}
              variant={platformFilter === platform ? "default" : "outline"}
              className="cursor-pointer capitalize"
              onClick={() => setPlatformFilter(platform)}
            >
              {platform} ({posts.filter(p => p.platform === platform).length})
            </Badge>
          ))}
        </div>
      </div>

      {/* Posts List */}
      {loading ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Loading posts...</p>
        </div>
      ) : filteredPosts.length > 0 ? (
        <div className="space-y-4">
          {filteredPosts.map((post) => {
            const Icon = platformIcons[post.platform as keyof typeof platformIcons] || ExternalLink;
            const platformColor = platformColors[post.platform as keyof typeof platformColors] || "bg-gray-500/10 text-gray-700 border-gray-500/20";
            
            return (
              <Card key={post.id} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <Badge className={platformColor}>
                        <Icon className="w-3 h-3 mr-1" />
                        {post.platform}
                      </Badge>
                      {post.featured && (
                        <Badge className="bg-amber-500/10 text-amber-700 border-amber-500/20">
                          Featured
                        </Badge>
                      )}
                      {post.engagement !== null && (
                        <Badge variant="outline">
                          {post.engagement} engagement
                        </Badge>
                      )}
                      <span className="text-sm text-muted-foreground">
                        {new Date(post.publishedDate).toLocaleDateString()}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold mb-2">
                      {post.title}
                    </h3>

                    {post.excerpt && (
                      <p className="text-muted-foreground line-clamp-3 mb-3">
                        {post.excerpt}
                      </p>
                    )}

                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-3">
                        {post.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}

                    <p className="text-xs text-muted-foreground">
                      Added: {new Date(post.createdAt).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="flex flex-col gap-2">
                    <Button size="sm" variant="outline" asChild>
                      <a href={post.postUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        View
                      </a>
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => router.push(`/admin/publications/social/${post.id}`)}
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                    {deleteConfirm === post.id ? (
                      <div className="space-y-2">
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDelete(post.id)}
                        >
                          Confirm?
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => setDeleteConfirm(null)}
                        >
                          Cancel
                        </Button>
                      </div>
                    ) : (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setDeleteConfirm(post.id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      ) : (
        <Card className="p-12 text-center bg-muted/30 border-dashed border-2">
          <h3 className="text-xl font-semibold mb-2">No social posts yet</h3>
          <p className="text-muted-foreground mb-6">
            Add your first social media post to showcase your research outreach
          </p>
          <Button variant="outline" asChild>
            <Link href="/admin/publications/social/new">
              <Plus className="w-4 h-4 mr-2" />
              Add Your First Post
            </Link>
          </Button>
        </Card>
      )}
    </div>
  );
}
