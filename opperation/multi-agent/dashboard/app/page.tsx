'use client'

import { useState, useEffect } from 'react'

interface AgentStatus {
  name: string
  status: 'active' | 'working' | 'idle' | 'error' | 'offline'
  currentTask: string
  progress: number | null
}

interface Task {
  id: string
  command: string
  status: 'pending' | 'in_progress' | 'completed' | 'failed'
  duration: string
}

interface Skill {
  id: string
  trigger: string
  successRate: number
  usage: number
}

interface DashboardData {
  status: 'running' | 'stopped'
  agents: AgentStatus[]
  tasks: Task[]
  skills: Skill[]
  systemInfo: {
    started: string
    uptime: string
    tasksCompleted: number
    skillsGenerated: number
  }
  lastUpdated: string
}

const StatusBadge = ({ status }: { status: AgentStatus['status'] }) => {
  const colors = {
    active: 'bg-green-500',
    working: 'bg-yellow-500 status-pulse',
    idle: 'bg-gray-500',
    error: 'bg-red-500',
    offline: 'bg-gray-700',
  }

  const labels = {
    active: 'Active',
    working: 'Working',
    idle: 'Idle',
    error: 'Error',
    offline: 'Offline',
  }

  return (
    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${colors[status]}`}>
      <span className={`w-2 h-2 rounded-full mr-1 ${status === 'working' ? 'bg-yellow-200' : 'bg-white'}`}></span>
      {labels[status]}
    </span>
  )
}

const ProgressBar = ({ progress }: { progress: number | null }) => {
  if (progress === null) return <span className="text-gray-500">-</span>

  return (
    <div className="w-full bg-gray-700 rounded-full h-2">
      <div
        className="bg-blue-500 h-2 rounded-full transition-all duration-300"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  )
}

export default function Dashboard() {
  const [data, setData] = useState<DashboardData>({
    status: 'stopped',
    agents: [
      { name: 'Orchestrator', status: 'offline', currentTask: '-', progress: null },
      { name: 'Coordinator', status: 'offline', currentTask: '-', progress: null },
      ...Array.from({ length: 8 }, (_, i) => ({
        name: `SubAgent-${i + 1}`,
        status: 'offline' as const,
        currentTask: '-',
        progress: null,
      })),
    ],
    tasks: [],
    skills: [],
    systemInfo: {
      started: 'Not started',
      uptime: '-',
      tasksCompleted: 0,
      skillsGenerated: 0,
    },
    lastUpdated: new Date().toISOString(),
  })

  const [isConnected, setIsConnected] = useState(false)

  // Fetch dashboard data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/status')
        if (res.ok) {
          const newData = await res.json()
          setData(newData)
          setIsConnected(true)
        }
      } catch {
        setIsConnected(false)
      }
    }

    fetchData()
    const interval = setInterval(fetchData, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <main className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Multi-Agent Dashboard</h1>
          <p className="text-gray-400 mt-1">Real-time system monitoring</p>
        </div>
        <div className="flex items-center gap-4">
          <span className={`flex items-center gap-2 ${isConnected ? 'text-green-400' : 'text-red-400'}`}>
            <span className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-400' : 'bg-red-400'}`}></span>
            {isConnected ? 'Connected' : 'Disconnected'}
          </span>
          <span
            className={`px-4 py-2 rounded-lg font-semibold ${
              data.status === 'running' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
            }`}
          >
            {data.status === 'running' ? '🟢 Running' : '🔴 Stopped'}
          </span>
        </div>
      </div>

      {/* Agents Grid */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Agents</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {data.agents.map((agent) => (
            <div
              key={agent.name}
              className="bg-gray-800 rounded-lg p-4 border border-gray-700 hover:border-gray-600 transition-colors"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium">{agent.name}</h3>
                <StatusBadge status={agent.status} />
              </div>
              <div className="text-sm text-gray-400 mb-2 truncate" title={agent.currentTask}>
                {agent.currentTask}
              </div>
              <ProgressBar progress={agent.progress} />
            </div>
          ))}
        </div>
      </section>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Tasks */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Recent Tasks</h2>
          <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-750">
                <tr className="border-b border-gray-700">
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">Task ID</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">Command</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">Status</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">Duration</th>
                </tr>
              </thead>
              <tbody>
                {data.tasks.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-4 py-8 text-center text-gray-500">
                      No tasks yet
                    </td>
                  </tr>
                ) : (
                  data.tasks.map((task) => (
                    <tr key={task.id} className="border-b border-gray-700 last:border-b-0">
                      <td className="px-4 py-3 text-sm font-mono">{task.id}</td>
                      <td className="px-4 py-3 text-sm">{task.command}</td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex items-center px-2 py-1 rounded text-xs ${
                            task.status === 'completed'
                              ? 'bg-green-500/20 text-green-400'
                              : task.status === 'failed'
                              ? 'bg-red-500/20 text-red-400'
                              : task.status === 'in_progress'
                              ? 'bg-yellow-500/20 text-yellow-400'
                              : 'bg-gray-500/20 text-gray-400'
                          }`}
                        >
                          {task.status === 'completed' && '✓'}
                          {task.status === 'failed' && '✗'}
                          {task.status === 'in_progress' && '⟳'}
                          {task.status === 'pending' && '○'}
                          <span className="ml-1">{task.status}</span>
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-400">{task.duration}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* Auto-Generated Skills */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Auto-Generated Skills</h2>
          <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-750">
                <tr className="border-b border-gray-700">
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">Skill ID</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">Trigger</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">Success</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">Usage</th>
                </tr>
              </thead>
              <tbody>
                {data.skills.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-4 py-8 text-center text-gray-500">
                      No skills generated yet
                    </td>
                  </tr>
                ) : (
                  data.skills.map((skill) => (
                    <tr key={skill.id} className="border-b border-gray-700 last:border-b-0">
                      <td className="px-4 py-3 text-sm font-mono">{skill.id}</td>
                      <td className="px-4 py-3 text-sm">{skill.trigger}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-16 bg-gray-700 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${
                                skill.successRate >= 0.8 ? 'bg-green-500' : 'bg-yellow-500'
                              }`}
                              style={{ width: `${skill.successRate * 100}%` }}
                            ></div>
                          </div>
                          <span className="text-sm text-gray-400">
                            {Math.round(skill.successRate * 100)}%
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-400">{skill.usage}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>

      {/* System Info */}
      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-4">System Info</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="text-sm text-gray-400 mb-1">Started</div>
            <div className="text-lg font-medium">{data.systemInfo.started}</div>
          </div>
          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="text-sm text-gray-400 mb-1">Uptime</div>
            <div className="text-lg font-medium">{data.systemInfo.uptime}</div>
          </div>
          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="text-sm text-gray-400 mb-1">Tasks Completed</div>
            <div className="text-lg font-medium">{data.systemInfo.tasksCompleted}</div>
          </div>
          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="text-sm text-gray-400 mb-1">Skills Generated</div>
            <div className="text-lg font-medium">{data.systemInfo.skillsGenerated}</div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-8 text-center text-sm text-gray-500">
        Last updated: {new Date(data.lastUpdated).toLocaleString('ja-JP')}
      </footer>
    </main>
  )
}
