// HashRouter：GitHub Pages 沒有 SPA 後備路由，用 hash (#) 路由可避免重新整理/直接開深層網址時 404
import { HashRouter, Routes, Route, Navigate } from 'react-router';
import { WelcomeScreen } from './components/WelcomeScreen';
import { AssistantScreen } from './components/AssistantScreen';
import { BodySelector } from './components/BodySelector';
import { ExerciseList } from './components/ExerciseList';
import { ExerciseDetail } from './components/ExerciseDetail';

export default function App() {
  return (
    <HashRouter>
      <div className="size-full">
        <Routes>
          <Route path="/" element={<AssistantScreen />} />
          <Route path="/exercises" element={<BodySelector />} />
          <Route path="/exercises/:bodyPartId" element={<ExerciseList />} />
          <Route path="/exercises/:bodyPartId/:exerciseId" element={<ExerciseDetail />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </HashRouter>
  );
}