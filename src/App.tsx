import React, { useState, useRef, useEffect } from 'react';
import { 
  Users, 
  Play, 
  Eye, 
  Clock, 
  Zap,
  Calendar,
  ChevronRight,
  Heart,
  MessageCircle,
  Share2,
  Shield,
  Award,
  Activity,
  ChevronDown,
  Send,
  Settings,
  Volume2,
  Maximize2,
  Pause,
  MapPin,
  Star,
  TrendingUp,
  Menu,
  X,
  ChevronLeft,
  Plus,
  Minus,
  Globe,
  MessageSquare,
  Twitter,
  Youtube
} from 'lucide-react';

interface Stream {
  id: string;
  streamer: string;
  title: string;
  character: string;
  viewers: number;
  thumbnail: string;
  isLive: boolean;
  faction: string;
  department?: string;
}

interface Character {
  id: string;
  name: string;
  player: string;
  job: string;
  department?: string;
  status: 'active' | 'inactive' | 'on-duty';
  avatar: string;
  reputation: number;
}

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  type: 'heist' | 'race' | 'event' | 'meeting';
  participants: number;
  maxParticipants: number;
}

interface ChatMessage {
  id: string;
  username: string;
  message: string;
  timestamp: string;
  isSubscriber?: boolean;
  isModerator?: boolean;
}

interface Clip {
  id: string;
  title: string;
  streamer: string;
  character: string;
  thumbnail: string;
  duration: string;
  views: number;
  timestamp: string;
}

interface PlayerLocation {
  id: string;
  character: string;
  streamer: string;
  x: number;
  y: number;
  faction: string;
  activity: string;
}

function App() {
  const [activeTab, setActiveTab] = useState<'streams' | 'characters' | 'events'>('streams');
  const [selectedChatStream, setSelectedChatStream] = useState<'stream1' | 'stream2'>('stream1');
  const [chatMessage, setChatMessage] = useState('');
  const [isStream1Playing, setIsStream1Playing] = useState(false);
  const [isStream2Playing, setIsStream2Playing] = useState(false);
  const [stream1Volume, setStream1Volume] = useState(50);
  const [stream2Volume, setStream2Volume] = useState(50);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isChatHidden, setIsChatHidden] = useState(false);
  
  const stream1Ref = useRef<HTMLVideoElement>(null);
  const stream2Ref = useRef<HTMLVideoElement>(null);

  // Sample video URLs (using placeholder videos)
  const stream1VideoUrl = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";
  const stream2VideoUrl = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4";

  const featuredStreams: Stream[] = [
    // Police/Law Enforcement
    {
      id: '1',
      streamer: 'koil',
      title: 'Trooper Soze - Highway Patrol',
      character: 'Francis J Francer',
      viewers: 15420,
      thumbnail: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=300',
      isLive: true,
      faction: 'Police',
      department: 'SASP'
    },
    {
      id: '2',
      streamer: 'Kyle',
      title: 'Sheriff Kyle Pred - BCSO Operations',
      character: 'Kyle Pred',
      viewers: 12850,
      thumbnail: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=300',
      isLive: true,
      faction: 'Police',
      department: 'BCSO'
    },
    {
      id: '3',
      streamer: 'uhSnow',
      title: 'Trooper Snow - Traffic Stop',
      character: 'Trooper Snow',
      viewers: 8940,
      thumbnail: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=300',
      isLive: true,
      faction: 'Police',
      department: 'SASP'
    },
    {
      id: '4',
      streamer: 'Penta',
      title: 'Officer Wrangler - Investigation',
      character: 'Ron Otterman',
      viewers: 7650,
      thumbnail: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=300',
      isLive: true,
      faction: 'Police',
      department: 'LSPD'
    },
    
    // Chang Gang
    {
      id: '5',
      streamer: 'Ramee',
      title: 'Ramee El-Rahman - CG Heist Prep',
      character: 'Ramee El-Rahman',
      viewers: 28750,
      thumbnail: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=300',
      isLive: true,
      faction: 'Chang Gang'
    },
    {
      id: '6',
      streamer: 'RatedEpicz',
      title: 'Randy Bullet - Racing',
      character: 'Randy Bullet',
      viewers: 22180,
      thumbnail: 'https://images.pexels.com/photos/1666021/pexels-photo-1666021.jpeg?auto=compress&cs=tinysrgb&w=300',
      isLive: true,
      faction: 'Chang Gang'
    },
    {
      id: '7',
      streamer: 'Shotz',
      title: 'Vinny Pistone - CG Business',
      character: 'Vinny Pistone',
      viewers: 18420,
      thumbnail: 'https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=300',
      isLive: true,
      faction: 'Chang Gang'
    },
    {
      id: '8',
      streamer: 'Lord_Kebun',
      title: 'Mr. K - Gang Operations',
      character: 'Mr. K',
      viewers: 31250,
      thumbnail: 'https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg?auto=compress&cs=tinysrgb&w=300',
      isLive: true,
      faction: 'Chang Gang'
    }
  ];

  const activeCharacters: Character[] = [
    {
      id: '1',
      name: 'Trooper Soze',
      player: 'koil',
      job: 'State Trooper',
      department: 'SASP',
      status: 'on-duty',
      avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=100',
      reputation: 98
    },
    {
      id: '2',
      name: 'Ramee El-Rahman',
      player: 'Ramee',
      job: 'Business Owner',
      status: 'active',
      avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=100',
      reputation: 85
    },
    {
      id: '3',
      name: 'Randy Bullet',
      player: 'RatedEpicz',
      job: 'Chang Gang',
      status: 'active',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100',
      reputation: 92
    },
    {
      id: '4',
      name: 'Claire Seducer',
      player: 'bananabrea',
      job: 'EMS',
      department: 'Pillbox Medical',
      status: 'on-duty',
      avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=100',
      reputation: 89
    }
  ];

  const upcomingEvents: Event[] = [
    {
      id: '1',
      title: 'Paleto Bank Heist',
      description: 'Major heist planned by the Chang Gang',
      date: '2025-01-15',
      time: '21:00 EST',
      type: 'heist',
      participants: 4,
      maxParticipants: 6
    },
    {
      id: '2',
      title: 'Street Racing Tournament',
      description: 'Underground racing championship',
      date: '2025-01-16',
      time: '20:00 EST',
      type: 'race',
      participants: 12,
      maxParticipants: 16
    },
    {
      id: '3',
      title: 'City Council Meeting',
      description: 'Monthly city planning and law discussion',
      date: '2025-01-17',
      time: '19:00 EST',
      type: 'meeting',
      participants: 8,
      maxParticipants: 20
    }
  ];

  const chatMessages: ChatMessage[] = [
    {
      id: '1',
      username: 'NoPixelFan123',
      message: 'This heist is insane!',
      timestamp: '2:34 PM',
      isSubscriber: true
    },
    {
      id: '2',
      username: 'RPViewer',
      message: 'Charles is the best character',
      timestamp: '2:35 PM'
    },
    {
      id: '3',
      username: 'ModeratorUser',
      message: 'Keep it civil in chat everyone',
      timestamp: '2:35 PM',
      isModerator: true
    },
    {
      id: '4',
      username: 'SubUser99',
      message: 'Been watching for 3 years, love this server',
      timestamp: '2:36 PM',
      isSubscriber: true
    },
    {
      id: '5',
      username: 'NewViewer',
      message: 'What faction is Charles in?',
      timestamp: '2:36 PM'
    }
  ];

  const curatedClips: Clip[] = [
    {
      id: '1',
      title: 'Epic Bank Heist Escape',
      streamer: 'summit1g',
      character: 'Charles Johnson',
      thumbnail: 'https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=300',
      duration: '2:34',
      views: 125000,
      timestamp: '6 hours ago'
    },
    {
      id: '2',
      title: 'Trooper Soze Traffic Stop Gone Wrong',
      streamer: 'koil',
      character: 'Francis J Francer',
      thumbnail: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=300',
      duration: '4:12',
      views: 89000,
      timestamp: '8 hours ago'
    },
    {
      id: '3',
      title: 'Lang Buddha Business Deal',
      streamer: 'buddha',
      character: 'Lang Buddha',
      thumbnail: 'https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg?auto=compress&cs=tinysrgb&w=300',
      duration: '3:45',
      views: 67000,
      timestamp: '12 hours ago'
    },
    {
      id: '4',
      title: 'Randy Bullet Street Race Win',
      streamer: 'RatedEpicz',
      character: 'Randy Bullet',
      thumbnail: 'https://images.pexels.com/photos/1666021/pexels-photo-1666021.jpeg?auto=compress&cs=tinysrgb&w=300',
      duration: '1:58',
      views: 45000,
      timestamp: '14 hours ago'
    }
  ];

  const playerLocations: PlayerLocation[] = [
    { id: '1', character: 'Charles Johnson', streamer: 'summit1g', x: 35, y: 45, faction: 'Chang Gang', activity: 'Bank Heist' },
    { id: '2', character: 'Lang Buddha', streamer: 'buddha', x: 60, y: 30, faction: 'Clean Boys', activity: 'Business Meeting' },
    { id: '3', character: 'Trooper Soze', streamer: 'koil', x: 25, y: 60, faction: 'Police', activity: 'Highway Patrol' },
    { id: '4', character: 'Randy Bullet', streamer: 'RatedEpicz', x: 70, y: 55, faction: 'Chang Gang', activity: 'Street Racing' },
    { id: '5', character: 'Ramee El-Rahman', streamer: 'Ramee', x: 40, y: 35, faction: 'Chang Gang', activity: 'Planning' },
    { id: '6', character: 'Kyle Pred', streamer: 'Kyle', x: 50, y: 70, faction: 'Police', activity: 'Investigation' }
  ];

  const toggleStream1 = () => {
    if (stream1Ref.current) {
      if (isStream1Playing) {
        stream1Ref.current.pause();
      } else {
        stream1Ref.current.play();
      }
      setIsStream1Playing(!isStream1Playing);
    }
  };

  const toggleStream2 = () => {
    if (stream2Ref.current) {
      if (isStream2Playing) {
        stream2Ref.current.pause();
      } else {
        stream2Ref.current.play();
      }
      setIsStream2Playing(!isStream2Playing);
    }
  };

  const handleStream1VolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const volume = parseInt(e.target.value);
    setStream1Volume(volume);
    if (stream1Ref.current) {
      stream1Ref.current.volume = volume / 100;
    }
  };

  const handleStream2VolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const volume = parseInt(e.target.value);
    setStream2Volume(volume);
    if (stream2Ref.current) {
      stream2Ref.current.volume = volume / 100;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-400';
      case 'on-duty': return 'text-blue-400';
      case 'inactive': return 'text-gray-400';
      default: return 'text-gray-400';
    }
  };

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'heist': return 'from-red-500 to-orange-500';
      case 'race': return 'from-yellow-500 to-orange-500';
      case 'event': return 'from-purple-500 to-pink-500';
      case 'meeting': return 'from-blue-500 to-cyan-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const getFactionColor = (faction: string) => {
    switch (faction) {
      case 'Police': return 'from-blue-600 to-blue-800';
      case 'Chang Gang': return 'from-red-600 to-red-800';
      case 'Clean Boys': return 'from-green-600 to-green-800';
      case 'Vagos': return 'from-yellow-600 to-yellow-800';
      case 'EMS': return 'from-pink-600 to-pink-800';
      default: return 'from-gray-600 to-gray-800';
    }
  };

  const formatViewers = (count: number) => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };

  const groupStreamsByFaction = () => {
    const grouped: { [key: string]: Stream[] } = {};
    // Only show Police and Chang Gang factions
    const allowedFactions = ['Police', 'Chang Gang'];
    
    featuredStreams.forEach(stream => {
      if (allowedFactions.includes(stream.faction)) {
        if (!grouped[stream.faction]) {
          grouped[stream.faction] = [];
        }
        grouped[stream.faction].push(stream);
      }
    });
    return grouped;
  };

  const handleSendMessage = () => {
    if (chatMessage.trim()) {
      // In a real app, this would send the message
      setChatMessage('');
    }
  };

  const getPlayerLocationColor = (faction: string) => {
    switch (faction) {
      case 'Police': return 'bg-blue-500';
      case 'Chang Gang': return 'bg-red-500';
      case 'Clean Boys': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white flex">
      {/* Left Sidebar - Collapsible */}
      <div className={`${isSidebarCollapsed ? 'w-16' : 'w-64'} bg-black/30 backdrop-blur-md border-r border-blue-500/20 flex flex-col transition-all duration-300`}>
        {/* Sidebar Toggle */}
        <div className="p-4 border-b border-gray-700/50">
          <button
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className="p-2 bg-gray-800/50 rounded-lg hover:bg-gray-700/50 transition-colors"
          >
            {isSidebarCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </button>
        </div>

        {!isSidebarCollapsed && (
          <>
            {/* Server Description */}
            <div className="p-4 border-b border-gray-700/50">
              <h3 className="text-sm font-semibold mb-2">About NoPixel</h3>
              <p className="text-xs text-gray-300 leading-relaxed mb-3">
                NoPixel is a Grand Theft Auto V roleplay server featuring complex storylines, character development, and immersive gameplay.
              </p>
              
              {/* Social Links */}
              <div className="flex items-center space-x-2">
                <a
                  href="https://nopixel.net"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 bg-gray-700/50 rounded-lg hover:bg-blue-600/50 transition-colors group"
                  title="Official Website"
                >
                  <Globe className="h-3.5 w-3.5 text-gray-400 group-hover:text-white" />
                </a>
                <a
                  href="https://discord.gg/nopixel"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 bg-gray-700/50 rounded-lg hover:bg-indigo-600/50 transition-colors group"
                  title="Discord"
                >
                  <MessageSquare className="h-3.5 w-3.5 text-gray-400 group-hover:text-white" />
                </a>
                <a
                  href="https://twitter.com/nopixel"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 bg-gray-700/50 rounded-lg hover:bg-sky-600/50 transition-colors group"
                  title="Twitter"
                >
                  <Twitter className="h-3.5 w-3.5 text-gray-400 group-hover:text-white" />
                </a>
                <a
                  href="https://youtube.com/nopixel"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 bg-gray-700/50 rounded-lg hover:bg-red-600/50 transition-colors group"
                  title="YouTube"
                >
                  <Youtube className="h-3.5 w-3.5 text-gray-400 group-hover:text-white" />
                </a>
              </div>
            </div>

            {/* Server Status */}
            <div className="p-4 border-b border-gray-700/50">
              <h3 className="text-sm font-semibold mb-3">Server Status</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1 bg-green-500/20 px-2 py-1 rounded-full">
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-green-400 text-xs font-medium">Online</span>
                  </div>
                  <div className="text-xs text-gray-300">
                    <span className="text-white font-semibold">198</span>/200
                  </div>
                </div>
                
                <div className="bg-gray-800/50 rounded-lg p-2">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-gray-400">Server Load</span>
                    <span className="text-xs text-white">99%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-1.5">
                    <div className="bg-gradient-to-r from-green-500 to-yellow-500 h-1.5 rounded-full" style={{ width: '99%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Online Players */}
            <div className="flex-1 p-4">
              <h3 className="text-sm font-semibold mb-3">Notable Players Online</h3>
              <div className="space-y-2">
                {activeCharacters.slice(0, 8).map((character) => (
                  <div key={character.id} className="flex items-center space-x-2 p-2 bg-gray-800/30 rounded-lg">
                    <img
                      src={character.avatar}
                      alt={character.name}
                      className="w-6 h-6 rounded-full object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-white truncate">{character.name}</p>
                      <p className="text-xs text-gray-400 truncate">{character.job}</p>
                    </div>
                    <div className={`w-1.5 h-1.5 rounded-full ${getStatusColor(character.status).replace('text-', 'bg-')}`}></div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header with NoPixel branding */}
        <header className="bg-black/20 backdrop-blur-md border-b border-blue-500/20">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                    NoPixel
                  </h1>
                  <p className="text-sm text-gray-400">Official Server Hub</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Dual Stream Players */}
        <div className="p-6 border-b border-gray-700/20">
          <div className="flex space-x-6">
            {/* Stream Players - Responsive width based on chat visibility */}
            <div className={`grid grid-cols-2 gap-6 ${isChatHidden ? 'flex-1' : 'flex-1'}`}>
              {/* Stream 1 - Summit1g */}
              <div className="bg-gray-800/40 rounded-xl overflow-hidden group relative">
                <div className="aspect-video bg-gray-900 relative">
                  <video
                    ref={stream1Ref}
                    src={stream1VideoUrl}
                    className="w-full h-full object-cover"
                    muted
                    loop
                    onLoadedData={() => {
                      if (stream1Ref.current) {
                        stream1Ref.current.volume = stream1Volume / 100;
                      }
                    }}
                  />
                  <div className="absolute top-4 left-4 bg-red-500 px-3 py-1.5 rounded-full text-sm font-medium flex items-center space-x-2">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                    <span>LIVE</span>
                  </div>
                  <div className="absolute top-4 right-4 bg-black/70 px-3 py-1.5 rounded-full text-sm flex items-center space-x-2">
                    <Eye className="h-4 w-4" />
                    <span>45.2K</span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={toggleStream1}
                        className="p-3 bg-black/50 rounded-lg hover:bg-black/70 transition-colors"
                      >
                        {isStream1Playing ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                      </button>
                      <div className="flex items-center space-x-2">
                        <Volume2 className="h-4 w-4" />
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={stream1Volume}
                          onChange={handleStream1VolumeChange}
                          className="w-20 h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer"
                        />
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button className="p-3 bg-black/50 rounded-lg hover:bg-black/70 transition-colors">
                        <Settings className="h-5 w-5" />
                      </button>
                      <button className="p-3 bg-black/50 rounded-lg hover:bg-black/70 transition-colors">
                        <Maximize2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                  
                  {/* Hover Info */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="bg-black/80 rounded-lg p-4 text-center">
                      <h3 className="font-semibold text-white text-lg mb-1">summit1g</h3>
                      <p className="text-sm text-gray-300">Charles Johnson</p>
                      <p className="text-xs text-blue-400">Chang Gang</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stream 2 - Buddha */}
              <div className="bg-gray-800/40 rounded-xl overflow-hidden group relative">
                <div className="aspect-video bg-gray-900 relative">
                  <video
                    ref={stream2Ref}
                    src={stream2VideoUrl}
                    className="w-full h-full object-cover"
                    muted
                    loop
                    onLoadedData={() => {
                      if (stream2Ref.current) {
                        stream2Ref.current.volume = stream2Volume / 100;
                      }
                    }}
                  />
                  <div className="absolute top-4 left-4 bg-red-500 px-3 py-1.5 rounded-full text-sm font-medium flex items-center space-x-2">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                    <span>LIVE</span>
                  </div>
                  <div className="absolute top-4 right-4 bg-black/70 px-3 py-1.5 rounded-full text-sm flex items-center space-x-2">
                    <Eye className="h-4 w-4" />
                    <span>38.9K</span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={toggleStream2}
                        className="p-3 bg-black/50 rounded-lg hover:bg-black/70 transition-colors"
                      >
                        {isStream2Playing ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                      </button>
                      <div className="flex items-center space-x-2">
                        <Volume2 className="h-4 w-4" />
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={stream2Volume}
                          onChange={handleStream2VolumeChange}
                          className="w-20 h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer"
                        />
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button className="p-3 bg-black/50 rounded-lg hover:bg-black/70 transition-colors">
                        <Settings className="h-5 w-5" />
                      </button>
                      <button className="p-3 bg-black/50 rounded-lg hover:bg-black/70 transition-colors">
                        <Maximize2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                  
                  {/* Hover Info */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="bg-black/80 rounded-lg p-4 text-center">
                      <h3 className="font-semibold text-white text-lg mb-1">buddha</h3>
                      <p className="text-sm text-gray-300">Lang Buddha</p>
                      <p className="text-xs text-green-400">Clean Boys</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Chat Section - Full component when visible, minimal when hidden */}
            {!isChatHidden ? (
              <div className="w-80 bg-gray-800/40 rounded-xl flex flex-col">
                {/* Chat Header with toggle */}
                <div className="p-4 border-b border-gray-700/50">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-white">Stream Chat</h3>
                    <button
                      onClick={() => setIsChatHidden(true)}
                      className="p-1 bg-gray-700/50 rounded hover:bg-gray-600/50 transition-colors"
                    >
                      <Minus className="h-4 w-4 text-gray-400" />
                    </button>
                  </div>
                  <div className="relative">
                    <select
                      value={selectedChatStream}
                      onChange={(e) => setSelectedChatStream(e.target.value as 'stream1' | 'stream2')}
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-sm text-white appearance-none cursor-pointer"
                    >
                      <option value="stream1">summit1g's Chat</option>
                      <option value="stream2">buddha's Chat</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                {/* Chat Messages */}
                <div className="flex-1 p-4 space-y-3 overflow-y-auto max-h-64">
                  {chatMessages.map((msg) => (
                    <div key={msg.id} className="text-sm">
                      <div className="flex items-start space-x-2">
                        <span className={`font-medium ${
                          msg.isModerator ? 'text-green-400' : 
                          msg.isSubscriber ? 'text-purple-400' : 'text-blue-400'
                        }`}>
                          {msg.username}
                        </span>
                        <span className="text-xs text-gray-500">{msg.timestamp}</span>
                      </div>
                      <p className="text-gray-300 mt-1">{msg.message}</p>
                    </div>
                  ))}
                </div>

                {/* Chat Input */}
                <div className="p-4 border-t border-gray-700/50">
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      placeholder="Type a message..."
                      value={chatMessage}
                      onChange={(e) => setChatMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                    />
                    <button
                      onClick={handleSendMessage}
                      className="p-2 bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors"
                    >
                      <Send className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              /* Collapsed Chat Toggle */
              <div className="flex items-start">
                <button
                  onClick={() => setIsChatHidden(false)}
                  className="p-3 bg-gray-800/40 rounded-xl border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300 hover:bg-gray-700/50"
                  title="Show Chat"
                >
                  <Plus className="h-5 w-5 text-gray-400" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Navigation Tabs - Moved below stream section */}
        <div className="px-6 py-4 border-b border-gray-700/20">
          <div className="flex items-center space-x-1 bg-gray-800/30 p-1 rounded-lg w-fit">
            {[
              { id: 'streams', label: 'Streams', icon: Play },
              { id: 'characters', label: 'Characters', icon: Users },
              { id: 'events', label: 'Events', icon: Calendar }
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id as any)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-all ${
                  activeTab === id
                    ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span className="text-sm font-medium">{label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-6 overflow-y-auto">
          {/* Streams Tab */}
          {activeTab === 'streams' && (
            <div className="space-y-8">
              {/* Faction Streams - Limited to 2 factions, 2 rows each */}
              {Object.entries(groupStreamsByFaction()).map(([faction, streams]) => (
                <div key={faction}>
                  <div className="flex items-center space-x-3 mb-4">
                    <div className={`px-4 py-2 bg-gradient-to-r ${getFactionColor(faction)} rounded-lg`}>
                      <h3 className="text-lg font-bold text-white">{faction}</h3>
                    </div>
                    <span className="text-sm text-gray-400">{streams.length} streamers</span>
                  </div>
                  
                  <div className="grid grid-cols-4 gap-4 mb-4">
                    {streams.slice(0, 4).map((stream) => (
                      <div key={stream.id} className="group bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-lg overflow-hidden hover:border-blue-500/50 transition-all duration-300 hover:transform hover:scale-105">
                        <div className="relative">
                          <img
                            src={stream.thumbnail}
                            alt={stream.title}
                            className="w-full h-20 object-cover"
                          />
                          <div className="absolute top-1 left-1">
                            <div className="flex items-center space-x-1 bg-red-500 px-1 py-0.5 rounded-full text-xs font-medium">
                              <div className="w-1 h-1 bg-white rounded-full animate-pulse"></div>
                              <span>LIVE</span>
                            </div>
                          </div>
                          <div className="absolute top-1 right-1 bg-black/70 px-1 py-0.5 rounded-full text-xs font-medium flex items-center space-x-1">
                            <Eye className="h-2 w-2" />
                            <span>{formatViewers(stream.viewers)}</span>
                          </div>
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <Play className="h-4 w-4 text-white" />
                          </div>
                        </div>
                        
                        <div className="p-2">
                          <h4 className="font-semibold text-white text-xs mb-1 truncate group-hover:text-blue-400 transition-colors">
                            {stream.streamer}
                          </h4>
                          <p className="text-xs text-gray-400 truncate">{stream.character}</p>
                          {stream.department && (
                            <p className="text-xs text-blue-400 truncate">{stream.department}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Second row */}
                  {streams.length > 4 && (
                    <div className="grid grid-cols-4 gap-4">
                      {streams.slice(4, 8).map((stream) => (
                        <div key={stream.id} className="group bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-lg overflow-hidden hover:border-blue-500/50 transition-all duration-300 hover:transform hover:scale-105">
                          <div className="relative">
                            <img
                              src={stream.thumbnail}
                              alt={stream.title}
                              className="w-full h-20 object-cover"
                            />
                            <div className="absolute top-1 left-1">
                              <div className="flex items-center space-x-1 bg-red-500 px-1 py-0.5 rounded-full text-xs font-medium">
                                <div className="w-1 h-1 bg-white rounded-full animate-pulse"></div>
                                <span>LIVE</span>
                              </div>
                            </div>
                            <div className="absolute top-1 right-1 bg-black/70 px-1 py-0.5 rounded-full text-xs font-medium flex items-center space-x-1">
                              <Eye className="h-2 w-2" />
                              <span>{formatViewers(stream.viewers)}</span>
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                              <Play className="h-4 w-4 text-white" />
                            </div>
                          </div>
                          
                          <div className="p-2">
                            <h4 className="font-semibold text-white text-xs mb-1 truncate group-hover:text-blue-400 transition-colors">
                              {stream.streamer}
                            </h4>
                            <p className="text-xs text-gray-400 truncate">{stream.character}</p>
                            {stream.department && (
                              <p className="text-xs text-blue-400 truncate">{stream.department}</p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {/* Curated Clips Section */}
              <div className="mt-12">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
                    <Star className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Today's Highlights</h3>
                  <span className="text-sm text-gray-400">Curated clips from the past 24 hours</span>
                </div>
                
                <div className="grid grid-cols-4 gap-4">
                  {curatedClips.map((clip) => (
                    <div key={clip.id} className="group bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-lg overflow-hidden hover:border-purple-500/50 transition-all duration-300 hover:transform hover:scale-105">
                      <div className="relative">
                        <img
                          src={clip.thumbnail}
                          alt={clip.title}
                          className="w-full h-24 object-cover"
                        />
                        <div className="absolute bottom-1 right-1 bg-black/70 px-1 py-0.5 rounded text-xs font-medium">
                          {clip.duration}
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <Play className="h-6 w-6 text-white" />
                        </div>
                      </div>
                      
                      <div className="p-3">
                        <h4 className="font-semibold text-white text-sm mb-1 truncate group-hover:text-purple-400 transition-colors">
                          {clip.title}
                        </h4>
                        <p className="text-xs text-gray-400 mb-1 truncate">{clip.streamer} • {clip.character}</p>
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <div className="flex items-center space-x-1">
                            <TrendingUp className="h-3 w-3" />
                            <span>{formatViewers(clip.views)} views</span>
                          </div>
                          <span>{clip.timestamp}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Interactive GTA Map */}
              <div className="mt-12">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg">
                    <MapPin className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Live Player Map</h3>
                  <span className="text-sm text-gray-400">Real-time player locations</span>
                </div>
                
                <div className="bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
                  <div className="relative w-full h-96 bg-gradient-to-br from-green-900 via-yellow-900 to-blue-900 rounded-lg overflow-hidden">
                    {/* Map Background */}
                    <div className="absolute inset-0 opacity-20">
                      <div className="w-full h-full bg-gradient-to-br from-green-800 via-yellow-800 to-blue-800"></div>
                    </div>
                    
                    {/* Grid Lines */}
                    <div className="absolute inset-0">
                      {[...Array(10)].map((_, i) => (
                        <div key={`v-${i}`} className="absolute top-0 bottom-0 border-l border-gray-600/20" style={{ left: `${i * 10}%` }}></div>
                      ))}
                      {[...Array(10)].map((_, i) => (
                        <div key={`h-${i}`} className="absolute left-0 right-0 border-t border-gray-600/20" style={{ top: `${i * 10}%` }}></div>
                      ))}
                    </div>
                    
                    {/* Player Locations */}
                    {playerLocations.map((player) => (
                      <div
                        key={player.id}
                        className="absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
                        style={{ left: `${player.x}%`, top: `${player.y}%` }}
                      >
                        <div className={`w-3 h-3 ${getPlayerLocationColor(player.faction)} rounded-full border-2 border-white shadow-lg animate-pulse`}></div>
                        
                        {/* Tooltip */}
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                          <div className="bg-black/90 text-white text-xs rounded-lg px-2 py-1 whitespace-nowrap">
                            <div className="font-semibold">{player.character}</div>
                            <div className="text-gray-300">{player.streamer}</div>
                            <div className="text-gray-400">{player.activity}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    {/* Map Legend */}
                    <div className="absolute top-4 right-4 bg-black/70 rounded-lg p-3">
                      <h4 className="text-sm font-semibold text-white mb-2">Legend</h4>
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <span className="text-xs text-gray-300">Police</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                          <span className="text-xs text-gray-300">Chang Gang</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-xs text-gray-300">Clean Boys</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Characters Tab */}
          {activeTab === 'characters' && (
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-6">Notable Characters Online</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {activeCharacters.map((character) => (
                    <div key={character.id} className="bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 hover:border-blue-500/50 transition-all duration-300">
                      <div className="flex items-center space-x-4 mb-4">
                        <img
                          src={character.avatar}
                          alt={character.name}
                          className="w-12 h-12 rounded-full object-cover border-2 border-gray-600"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold text-white">{character.name}</h3>
                          <p className="text-sm text-gray-400">@{character.player}</p>
                        </div>
                        <div className={`flex items-center space-x-1 ${getStatusColor(character.status)}`}>
                          <div className="w-2 h-2 bg-current rounded-full"></div>
                          <span className="text-xs font-medium capitalize">{character.status.replace('-', ' ')}</span>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm text-gray-400">Job</p>
                          <p className="text-white font-medium">{character.job}</p>
                          {character.department && (
                            <p className="text-xs text-blue-400">{character.department}</p>
                          )}
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-gray-400">Reputation</p>
                            <div className="flex items-center space-x-2">
                              <div className="w-16 bg-gray-700 rounded-full h-2">
                                <div 
                                  className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full"
                                  style={{ width: `${character.reputation}%` }}
                                ></div>
                              </div>
                              <span className="text-xs text-white">{character.reputation}%</span>
                            </div>
                          </div>
                          <Award className="h-5 w-5 text-yellow-400" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Events Tab */}
          {activeTab === 'events' && (
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-6">Upcoming Events</h2>
                
                <div className="space-y-4">
                  {upcomingEvents.map((event) => (
                    <div key={event.id} className="bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 hover:border-blue-500/50 transition-all duration-300">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-3">
                            <div className={`p-2 bg-gradient-to-r ${getEventTypeColor(event.type)} rounded-lg`}>
                              <Calendar className="h-5 w-5 text-white" />
                            </div>
                            <div>
                              <h3 className="text-xl font-bold text-white">{event.title}</h3>
                              <p className="text-gray-400 capitalize">{event.type}</p>
                            </div>
                          </div>
                          
                          <p className="text-gray-300 mb-4">{event.description}</p>
                          
                          <div className="flex items-center space-x-6">
                            <div className="flex items-center space-x-2">
                              <Clock className="h-4 w-4 text-gray-400" />
                              <span className="text-sm text-gray-300">{event.date} at {event.time}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Users className="h-4 w-4 text-gray-400" />
                              <span className="text-sm text-gray-300">
                                {event.participants}/{event.maxParticipants} participants
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex flex-col items-end space-y-2">
                          <div className="w-24 bg-gray-700 rounded-full h-2">
                            <div 
                              className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full"
                              style={{ width: `${(event.participants / event.maxParticipants) * 100}%` }}
                            ></div>
                          </div>
                          <button className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 px-6 py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105">
                            Join Event
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;