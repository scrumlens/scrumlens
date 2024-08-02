import type { BoardAdd } from '~/services/api/generated'
import { type BoardTemplate, Colors } from '~/types'

export const TEMPLATES: Record<BoardTemplate, BoardAdd['columns']> = {
  'start-stop-continue': [
    {
      title: 'Start',
      description: 'Ideas to begin implementing',
      color: Colors.Blue,
    },
    {
      title: 'Stop',
      description: 'Practices to discontinue',
      color: Colors.Red,
    },
    {
      title: 'Continue',
      description: 'Actions to maintain',
      color: Colors.Green,
    },
  ],
  'glad-sad-mad': [
    { title: 'Glad', description: 'Positive experiences', color: Colors.Green },
    { title: 'Sad', description: 'Negative experiences', color: Colors.Orange },
    {
      title: 'Mad',
      description: 'Frustrations and challenges',
      color: Colors.Red,
    },
  ],
  'wind-anchors-actions': [
    { title: 'Wind', description: 'Forces helping us', color: Colors.Blue },
    {
      title: 'Anchors',
      description: 'Obstacles holding us back',
      color: Colors.Orange,
    },
    {
      title: 'Actions',
      description: 'Steps for improvement',
      color: Colors.Green,
    },
  ],
  '3ws': [
    {
      title: 'What Went Well',
      description: 'Successful elements',
      color: Colors.Green,
    },
    {
      title: 'What Went Wrong',
      description: 'Aspects that didn\'t work',
      color: Colors.Red,
    },
    {
      title: 'What We Want to Improve',
      description: 'Areas for development',
      color: Colors.Purple,
    },
  ],
}
