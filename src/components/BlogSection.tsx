import React, { useState } from 'react';
import { BookOpen, Calendar, Clock, ArrowRight, X, Sparkles, User } from 'lucide-react';
import { BlogPost } from '../types';

interface BlogSectionProps {
  posts: BlogPost[];
}

export const BlogSection: React.FC<BlogSectionProps> = ({ posts }) => {
  const [activePost, setActivePost] = useState<BlogPost | null>(null);

  return (
    <section id="blog" className="py-20 relative bg-slate-950/60 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-800/60 text-cyan-400 text-xs font-semibold tracking-wider uppercase">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Product Leadership & Industry Perspectives</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100 tracking-tight">
            Thought <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Leadership & Blog</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Essays on agentic AI in enterprise software, autonomous material handling, and scaling high-performance engineering organizations.
          </p>
        </div>

        {/* Posts Grid */}
        <div className="grid md:grid-cols-3 gap-6 text-left">
          {posts.map((post) => (
            <div 
              key={post.id}
              className="bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-cyan-500/40 rounded-2xl p-6 transition-all duration-200 shadow-xl flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-slate-400 mb-3">
                  <span className="flex items-center gap-1 font-mono">
                    <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                    {post.publishDate}
                  </span>
                  <span className="flex items-center gap-1 font-mono">
                    <Clock className="w-3.5 h-3.5 text-cyan-400" />
                    {post.readTime}
                  </span>
                </div>

                <div className="flex flex-wrap gap-1.5 mb-3">
                  {post.tags.map((tag, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 text-[10px] font-mono border border-cyan-800">
                      {tag}
                    </span>
                  ))}
                </div>

                <h3 className="text-lg font-bold text-slate-100 group-hover:text-cyan-300 transition-colors mb-2">
                  {post.title}
                </h3>

                <p className="text-xs text-slate-300 leading-relaxed line-clamp-3 mb-4">
                  {post.excerpt}
                </p>
              </div>

              <button
                onClick={() => setActivePost(post)}
                className="flex items-center gap-2 text-xs font-bold text-cyan-400 hover:text-cyan-300 pt-3 border-t border-slate-800/80 transition-colors"
              >
                <span>Read Article</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>

      </div>

      {/* Reader Drawer / Modal */}
      {activePost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl text-left my-auto space-y-6">
            
            <button
              onClick={() => setActivePost(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-950 text-slate-400 hover:text-white border border-slate-800"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <div className="flex items-center gap-3 text-xs text-slate-400 mb-2">
                <span className="flex items-center gap-1 font-mono">
                  <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                  {activePost.publishDate}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1 font-mono">
                  <Clock className="w-3.5 h-3.5 text-cyan-400" />
                  {activePost.readTime}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1 font-mono text-cyan-300">
                  <User className="w-3.5 h-3.5" />
                  By {activePost.author}
                </span>
              </div>

              <h2 className="text-2xl font-extrabold text-slate-100 mt-1">
                {activePost.title}
              </h2>
            </div>

            <div className="prose prose-invert max-w-none text-slate-300 text-sm leading-relaxed whitespace-pre-line border-t border-slate-800 pt-4">
              {activePost.content}
            </div>

            <div className="pt-4 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => setActivePost(null)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl"
              >
                Close Article
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
