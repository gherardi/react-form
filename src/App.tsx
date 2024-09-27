import { Toaster } from '@/components/ui/toaster';
import { DemoForm } from '@/components/demo-form';

export default function App() {
	return (
		<div className='flex items-center justify-center min-h-svh'>
			<DemoForm />
			<Toaster />
		</div>
	);
}
