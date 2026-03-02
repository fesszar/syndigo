 import { useState } from 'react';
 import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
 import { Button } from '@/components/ui/button';
 import { Input } from '@/components/ui/input';
 import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
 import { 
   ChevronLeft, X, Search, Upload, Filter, Check, Play
 } from 'lucide-react';
 import { cn } from '@/lib/utils';
 import { VideoItem } from '@/types/widget';
 
 // Mock videos for demo
 const MOCK_PROJECT_VIDEOS = [
   { id: 'v1', url: 'https://example.com/video1.mp4', name: 'product-demo.mp4', thumbnail: 'https://images.unsplash.com/photo-1560807707-8cc77767d783?w=400' },
   { id: 'v2', url: 'https://example.com/video2.mp4', name: 'feature-overview.mp4', thumbnail: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400' },
   { id: 'v3', url: 'https://example.com/video3.mp4', name: 'tutorial-01.mp4', thumbnail: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400' },
   { id: 'v4', url: 'https://example.com/video4.mp4', name: 'promo-video.mp4', thumbnail: 'https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?w=400' },
 ];
 
 const MOCK_ALL_VIDEOS = [
   ...MOCK_PROJECT_VIDEOS,
   { id: 'v5', url: 'https://example.com/video5.mp4', name: 'brand-story.mp4', thumbnail: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400' },
   { id: 'v6', url: 'https://example.com/video6.mp4', name: 'how-it-works.mp4', thumbnail: 'https://images.unsplash.com/photo-1497493292307-31c376b6e479?w=400' },
   { id: 'v7', url: 'https://example.com/video7.mp4', name: 'customer-review.mp4', thumbnail: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=400' },
   { id: 'v8', url: 'https://example.com/video8.mp4', name: 'unboxing.mp4', thumbnail: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=400' },
 ];
 
 interface AddVideosModalProps {
   open: boolean;
   onOpenChange: (open: boolean) => void;
   onAddVideos: (videos: VideoItem[]) => void;
   maxVideos?: number;
   /** When true, only allows selecting one video and immediately adds it */
   singleSelect?: boolean;
   /** Custom title for the modal */
   title?: string;
 }
 
 export function AddVideosModal({ 
   open, 
   onOpenChange, 
   onAddVideos,
   maxVideos = 10,
   singleSelect = false,
   title = 'Add Videos',
 }: AddVideosModalProps) {
   const [activeTab, setActiveTab] = useState<'project' | 'all'>('project');
   const [searchQuery, setSearchQuery] = useState('');
   const [selectedVideos, setSelectedVideos] = useState<string[]>([]);
 
   const videos = activeTab === 'project' ? MOCK_PROJECT_VIDEOS : MOCK_ALL_VIDEOS;
   
   const filteredVideos = videos.filter(video => 
     video.name.toLowerCase().includes(searchQuery.toLowerCase())
   );
 
   const toggleVideo = (id: string) => {
     if (singleSelect) {
       // In single select mode, immediately add the video
       const video = videos.find(v => v.id === id);
       if (video) {
         const selectedItem: VideoItem = {
           id: video.id,
           url: video.url,
           caption: '',
           description: '',
           reportingCode: '',
           snapshotUrl: video.thumbnail,
         };
         onAddVideos([selectedItem]);
         onOpenChange(false);
       }
       return;
     }
     
     setSelectedVideos(prev => {
       if (prev.includes(id)) {
         return prev.filter(v => v !== id);
       }
       if (prev.length >= maxVideos) return prev;
       return [...prev, id];
     });
   };
 
   const handleAddVideos = () => {
     const selectedItems: VideoItem[] = videos
       .filter(v => selectedVideos.includes(v.id))
       .map(v => ({
         id: v.id,
         url: v.url,
         caption: '',
         description: '',
         reportingCode: '',
         snapshotUrl: v.thumbnail,
       }));
     onAddVideos(selectedItems);
     setSelectedVideos([]);
     onOpenChange(false);
   };
 
   const handleClose = () => {
     setSelectedVideos([]);
     onOpenChange(false);
   };
 
   const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
     const files = e.target.files;
     if (!files) return;
     
     // In real app, upload to storage and get URLs
     const newVideos: VideoItem[] = Array.from(files).map((file, idx) => ({
       id: `upload-${Date.now()}-${idx}`,
       url: URL.createObjectURL(file),
       caption: '',
       description: '',
       reportingCode: '',
     }));
     
     onAddVideos(newVideos);
     onOpenChange(false);
   };
 
   return (
     <Dialog open={open} onOpenChange={handleClose}>
       <DialogContent className="max-w-4xl p-0 gap-0 overflow-hidden">
         {/* Header */}
         <div className="bg-[#1e3a5f] text-white px-6 py-4 flex items-center justify-between">
           <div className="flex items-center gap-3">
             <ChevronLeft className="w-5 h-5 cursor-pointer hover:opacity-80" onClick={handleClose} />
             <DialogTitle className="text-lg font-medium">{title}</DialogTitle>
           </div>
           <X className="w-5 h-5 cursor-pointer hover:opacity-80" onClick={handleClose} />
         </div>
 
         {/* Tabs */}
         <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'project' | 'all')} className="flex-1 flex flex-col">
           <div className="border-b border-border">
             <TabsList className="h-12 p-0 bg-transparent rounded-none w-full justify-start gap-0">
               <TabsTrigger 
                 value="project" 
                 className={cn(
                   "h-12 px-8 rounded-none border-b-2 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=inactive]:border-transparent",
                   "uppercase text-sm font-semibold tracking-wide"
                 )}
               >
                 Project Videos
               </TabsTrigger>
               <TabsTrigger 
                 value="all" 
                 className={cn(
                   "h-12 px-8 rounded-none border-b-2 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=inactive]:border-transparent",
                   "uppercase text-sm font-semibold tracking-wide"
                 )}
               >
                 All Videos
               </TabsTrigger>
             </TabsList>
           </div>
 
           {/* Search and filters */}
           <div className="px-6 py-4 border-b border-border flex items-center justify-between gap-4">
             <p className="text-sm text-muted-foreground shrink-0">
               {singleSelect 
                 ? 'Select a video to use.' 
                 : `Select no more than ${maxVideos} videos you'd like to add to this content section.`
               }
             </p>
             
             <div className="flex items-center gap-3">
               {activeTab === 'all' && (
                 <Button variant="outline" size="sm" className="gap-2">
                   <Filter className="w-4 h-4" />
                   Add Filter
                 </Button>
               )}
               
               {activeTab === 'project' && (
                 <div className="relative w-48">
                   <select className="w-full h-9 px-3 pr-8 rounded-md border border-input bg-background text-sm appearance-none cursor-pointer">
                     <option>select a product</option>
                   </select>
                   <ChevronLeft className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 rotate-[270deg] pointer-events-none text-muted-foreground" />
                 </div>
               )}
               
               <div className="relative w-48">
                 <Input
                   placeholder="Search"
                   value={searchQuery}
                   onChange={(e) => setSearchQuery(e.target.value)}
                   className="h-9 pr-9"
                 />
                 <Search className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
               </div>
             </div>
           </div>
 
           {/* Videos Grid */}
           <TabsContent value="project" className="flex-1 m-0 p-6 overflow-y-auto max-h-[400px]">
             <div className="grid grid-cols-4 gap-4">
               {filteredVideos.map(video => (
                 <VideoCard
                   key={video.id}
                   video={video}
                   isSelected={selectedVideos.includes(video.id)}
                   onToggle={() => toggleVideo(video.id)}
                 />
               ))}
             </div>
           </TabsContent>
           
           <TabsContent value="all" className="flex-1 m-0 p-6 overflow-y-auto max-h-[400px]">
             <div className="grid grid-cols-4 gap-4">
               {filteredVideos.map(video => (
                 <VideoCard
                   key={video.id}
                   video={video}
                   isSelected={selectedVideos.includes(video.id)}
                   onToggle={() => toggleVideo(video.id)}
                 />
               ))}
             </div>
           </TabsContent>
         </Tabs>
 
         {/* Footer */}
         <div className="border-t border-border px-6 py-4 flex items-center justify-between bg-muted/30">
           {singleSelect ? (
             <p className="text-sm text-muted-foreground">Click a video to select it</p>
           ) : (
             <div className="flex items-center gap-3">
               <span className="text-sm">
                 <span className="font-semibold">{selectedVideos.length}</span> videos selected. 
                 {' '}Select up to {maxVideos - selectedVideos.length} more.
               </span>
               <Button 
                 variant="link" 
                 size="sm" 
                 className="text-muted-foreground p-0 h-auto"
                 onClick={() => setSelectedVideos([])}
                 disabled={selectedVideos.length === 0}
               >
                 Unselect All
               </Button>
             </div>
           )}
           
           <div className="flex items-center gap-3">
             {activeTab === 'all' && (
               <Button variant="outline" size="sm" className="gap-2" asChild>
                 <label>
                   <Upload className="w-4 h-4" />
                   Upload files
                   <input 
                     type="file" 
                     multiple={!singleSelect}
                     accept="video/*" 
                     className="hidden" 
                     onChange={handleFileUpload}
                   />
                 </label>
               </Button>
             )}
             <Button variant="ghost" onClick={handleClose}>
               Cancel
             </Button>
             {!singleSelect && (
               <Button 
                 onClick={handleAddVideos}
                 disabled={selectedVideos.length === 0}
                 className="bg-[#5dcfeb] hover:bg-[#4bc4e0] text-[#1e3a5f] font-semibold"
               >
                 ADD VIDEOS
               </Button>
             )}
           </div>
         </div>
       </DialogContent>
     </Dialog>
   );
 }
 
 interface VideoCardProps {
   video: { id: string; url: string; name: string; thumbnail: string };
   isSelected: boolean;
   onToggle: () => void;
 }
 
 function VideoCard({ video, isSelected, onToggle }: VideoCardProps) {
   return (
     <div 
       className={cn(
         "relative cursor-pointer group rounded-lg overflow-hidden border-2 transition-all",
         isSelected ? "border-primary ring-2 ring-primary/20" : "border-transparent hover:border-muted-foreground/30"
       )}
       onClick={onToggle}
     >
       <div className="aspect-video bg-muted relative">
         <img 
           src={video.thumbnail} 
           alt={video.name}
           className="w-full h-full object-cover"
         />
         {/* Play button overlay */}
         <div className="absolute inset-0 flex items-center justify-center">
           <div className="w-10 h-10 rounded-full bg-black/50 flex items-center justify-center">
             <Play className="w-5 h-5 text-white fill-white ml-0.5" />
           </div>
         </div>
       </div>
       
       {isSelected && (
         <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
           <Check className="w-4 h-4 text-primary-foreground" />
         </div>
       )}
       
       <p className="text-xs text-muted-foreground truncate px-2 py-2 bg-card">
         {video.name}
       </p>
     </div>
   );
 }