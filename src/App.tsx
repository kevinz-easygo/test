import React, { useState } from 'react';
import { 
  Users, 
  Calendar, 
  MessageSquare, 
  Settings, 
  Bell, 
  Search,
  Menu,
  X,
  Home,
  Trophy,
  Map,
  Shield,
  Gamepad2
} from 'lucide-react';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const sidebarItems = [
    { icon: Home, label: 'Dashboard', active: true },
    { icon: Users, label: 'Players Online', count: '247' },
    { icon: Calendar, label: 'Events', count: '3' },
    { icon: MessageSquare, label: 'Announcements' },
    { icon: Trophy, label: 'Leaderboards' },
    { icon: Map, label: 'Server Map' },
    { icon: Shield, label: 'Rules & Guidelines' },
    { icon: Gamepad2, label: 'Game Modes' },
    { icon: Settings, label: 'Settings' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Global Top Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-200 fixed top-0 left-0 right-0 z-50">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Left side - Logo and brand */}
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 lg:hidden"
              >
                {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
              <div className="flex items-center ml-2 lg:ml-0">
                <div className="flex-shrink-0 bg-gradient-to-r from-purple-600 to-blue-600 p-2 rounded-lg">
                  <Gamepad2 className="h-6 w-6 text-white" />
                </div>
                <div className="ml-3">
                  <h1 className="text-xl font-bold text-gray-900">NoPixel</h1>
                  <p className="text-xs text-gray-500 -mt-1">Official Server Hub</p>
                </div>
              </div>
            </div>

            {/* Center - Search */}
            <div className="hidden md:flex flex-1 max-w-lg mx-8">
              <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search players, events, or content..."
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Right side - Actions */}
            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg">
                <Bell size={20} />
                <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-400"></span>
              </button>
              <div className="flex items-center space-x-3">
                <div className="hidden sm:block text-right">
                  <p className="text-sm font-medium text-gray-900">Admin User</p>
                  <p className="text-xs text-gray-500">Server Administrator</p>
                </div>
                <div className="h-8 w-8 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center">
                  <span className="text-white text-sm font-medium">AU</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Layout Container */}
      <div className="pt-16 flex">
        {/* Sidebar */}
        <div className={`${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-40 w-64 bg-white shadow-lg border-r border-gray-200 transition-transform duration-300 ease-in-out lg:transition-none`}>
          <div className="flex flex-col h-full pt-4">
            {/* Sidebar Navigation */}
            <nav className="flex-1 px-4 space-y-1">
              {sidebarItems.map((item, index) => (
                <a
                  key={index}
                  href="#"
                  className={`group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    item.active
                      ? 'bg-purple-50 text-purple-700 border-r-2 border-purple-700'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <item.icon
                    className={`mr-3 h-5 w-5 ${
                      item.active ? 'text-purple-500' : 'text-gray-400 group-hover:text-gray-500'
                    }`}
                  />
                  <span className="flex-1">{item.label}</span>
                  {item.count && (
                    <span className={`ml-auto inline-block py-0.5 px-2 text-xs rounded-full ${
                      item.active
                        ? 'bg-purple-100 text-purple-600'
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      {item.count}
                    </span>
                  )}
                </a>
              ))}
            </nav>

            {/* Sidebar Footer */}
            <div className="p-4 border-t border-gray-200">
              <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-3">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="h-8 w-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                      <Shield className="h-4 w-4 text-white" />
                    </div>
                  </div>
                  <div className="ml-3 flex-1">
                    <p className="text-xs font-medium text-gray-900">Server Status</p>
                    <p className="text-xs text-green-600">Online • 247 players</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-gray-600 bg-opacity-50 z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          ></div>
        )}

        {/* Main Content */}
        <div className="flex-1 lg:ml-0">
          <main className="p-6">
            {/* Dashboard Header */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Server Dashboard</h2>
              <p className="text-gray-600">Welcome back! Here's what's happening on NoPixel today.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <Users className="h-6 w-6 text-green-600" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Players Online</p>
                    <p className="text-2xl font-bold text-gray-900">247</p>
                    <p className="text-xs text-green-600">+12 from yesterday</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Calendar className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Active Events</p>
                    <p className="text-2xl font-bold text-gray-900">3</p>
                    <p className="text-xs text-blue-600">2 ending soon</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Trophy className="h-6 w-6 text-purple-600" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Server Rank</p>
                    <p className="text-2xl font-bold text-gray-900">#1</p>
                    <p className="text-xs text-purple-600">Top GTA RP Server</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="h-12 w-12 bg-orange-100 rounded-lg flex items-center justify-center">
                      <MessageSquare className="h-6 w-6 text-orange-600" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">New Messages</p>
                    <p className="text-2xl font-bold text-gray-900">18</p>
                    <p className="text-xs text-orange-600">5 unread reports</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Recent Server Activity</h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {[
                    { user: 'PlayerOne', action: 'joined the server', time: '2 minutes ago', type: 'join' },
                    { user: 'AdminUser', action: 'started a new event: Bank Heist', time: '15 minutes ago', type: 'event' },
                    { user: 'PlayerTwo', action: 'completed mission: Drug Run', time: '23 minutes ago', type: 'mission' },
                    { user: 'PlayerThree', action: 'purchased vehicle: Lamborghini', time: '1 hour ago', type: 'purchase' },
                    { user: 'ModeratorX', action: 'issued warning to PlayerFour', time: '2 hours ago', type: 'moderation' },
                  ].map((activity, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
                        activity.type === 'join' ? 'bg-green-100' :
                        activity.type === 'event' ? 'bg-purple-100' :
                        activity.type === 'mission' ? 'bg-blue-100' :
                        activity.type === 'purchase' ? 'bg-yellow-100' :
                        'bg-red-100'
                      }`}>
                        <div className={`h-3 w-3 rounded-full ${
                          activity.type === 'join' ? 'bg-green-500' :
                          activity.type === 'event' ? 'bg-purple-500' :
                          activity.type === 'mission' ? 'bg-blue-500' :
                          activity.type === 'purchase' ? 'bg-yellow-500' :
                          'bg-red-500'
                        }`}></div>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-900">
                          <span className="font-medium">{activity.user}</span> {activity.action}
                        </p>
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;