import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getBuilderId, BuilderIdRecord } from '../lib/firebase';
import { CheckCircle, XCircle, ArrowLeft, MapPin, Code2 } from 'lucide-react';
import { cn } from '../lib/utils';

export function VerifyPage() {
  const { id } = useParams<{ id: string }>();
  const [record, setRecord] = useState<BuilderIdRecord | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchRecord() {
      if (!id) {
        setError('No ID provided');
        setLoading(false);
        return;
      }
      try {
        const data = await getBuilderId(id);
        if (data) {
          setRecord(data);
        } else {
          setError('INVALID ID');
        }
      } catch (e) {
        console.error(e);
        setError('Error fetching ID');
      } finally {
        setLoading(false);
      }
    }
    fetchRecord();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-hh-green-tropical flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-hh-yellow border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error || !record) {
    return (
      <div className="min-h-screen bg-hh-green-tropical flex flex-col items-center justify-center p-6 text-center">
        <div className="bg-hh-cream p-8 rounded-2xl max-w-md w-full border-4 border-hh-green-dark shadow-[8px_8px_0px_0px_rgba(10,46,31,1)]">
          <XCircle size={64} className="text-red-500 mx-auto mb-6" />
          <h1 className="font-display text-4xl font-black text-hh-green-dark mb-4 uppercase">
            {error === 'INVALID ID' ? 'INVALID ID' : 'ERROR'}
          </h1>
          <p className="text-hh-green-dark/80 font-bold mb-8">
            This HH Goa 2026 Builder ID could not be verified.
          </p>
          <Link to="/" className="inline-block bg-hh-green-dark text-hh-yellow px-6 py-3 rounded-xl font-bold hover:bg-hh-green-tropical transition-colors shadow-[4px_4px_0px_0px_rgba(255,209,102,1)]">
            GO TO HH GOA 2026
          </Link>
        </div>
      </div>
    );
  }

  if (record.status === 'REVOKED') {
    return (
      <div className="min-h-screen bg-hh-green-tropical flex flex-col items-center justify-center p-6 text-center">
        <div className="bg-hh-cream p-8 rounded-2xl max-w-md w-full border-4 border-hh-green-dark shadow-[8px_8px_0px_0px_rgba(10,46,31,1)]">
          <XCircle size={64} className="text-red-500 mx-auto mb-6" />
          <h1 className="font-display text-4xl font-black text-hh-green-dark mb-4 uppercase">⚠ ID REVOKED</h1>
          <p className="text-hh-green-dark/80 font-bold mb-8">
            This HH Goa 2026 Builder ID is no longer valid.
          </p>
          <Link to="/" className="inline-block bg-hh-green-dark text-hh-yellow px-6 py-3 rounded-xl font-bold hover:bg-hh-green-tropical transition-colors shadow-[4px_4px_0px_0px_rgba(255,209,102,1)]">
            GO TO HH GOA 2026
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-hh-green-tropical p-4 sm:p-8 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background Dots */}
      <div className="absolute inset-0 opacity-[0.08]" style={{ backgroundImage: 'radial-gradient(#FFE082 2px, transparent 2px)', backgroundSize: '30px 30px' }}></div>
      
      <div className="w-full max-w-md z-10">
        <Link to="/" className="inline-flex items-center text-hh-yellow font-bold mb-6 hover:text-white transition-colors">
          <ArrowLeft size={20} className="mr-2" /> HOME
        </Link>

        <div className="bg-hh-cream rounded-3xl overflow-hidden border-4 border-hh-green-dark shadow-[12px_12px_0px_0px_rgba(10,46,31,1)] relative">
          
          {/* Header */}
          <div className="bg-hh-green-dark text-center py-6 px-4 relative overflow-hidden">
            <div className="absolute top-[-50px] right-[-50px] w-32 h-32 bg-[#2b5e3a] rounded-full blur-2xl opacity-50"></div>
            <h1 className="font-display text-3xl font-black text-hh-cream uppercase tracking-widest relative z-10">
              HH GOA 2026
            </h1>
            <div className="inline-flex items-center gap-2 mt-3 bg-white px-4 py-1.5 rounded-full border-2 border-hh-green-dark shadow-[2px_2px_0px_0px_rgba(255,209,102,1)] relative z-10">
              <CheckCircle size={16} className="text-hh-green-tropical" />
              <span className="font-black text-xs text-hh-green-dark uppercase tracking-wider">
                ID VERIFIED
              </span>
            </div>
          </div>

          {/* Body */}
          <div className="p-6 sm:p-8 flex flex-col items-center text-center">
            
            {/* Photo */}
            <div className="w-32 h-32 rounded-full border-4 border-hh-green-dark shadow-[4px_4px_0px_0px_rgba(10,46,31,1)] mb-6 overflow-hidden bg-hh-green-tropical">
              <img src={record.photoBase64} alt={record.fullName} className="w-full h-full object-cover" />
            </div>

            <h2 className="font-display text-3xl font-black text-hh-green-dark uppercase mb-1">
              {record.fullName}
            </h2>
            
            {record.handle && (
              <p className="font-bold text-hh-green-dark/70 mb-4 text-lg">
                @{record.handle.replace(/^@/, '')}
              </p>
            )}
            
            {record.bio && (
              <div className="inline-flex items-center gap-2 bg-hh-yellow px-4 py-1.5 rounded-full border-2 border-hh-green-dark mb-4">
                <Code2 size={14} className="text-hh-green-dark" />
                <span className="font-black text-xs text-hh-green-dark uppercase tracking-wider">
                  {record.bio}
                </span>
              </div>
            )}

            {record.location && (
              <div className="flex items-center gap-1.5 text-sm font-bold text-hh-green-tropical mb-6">
                <MapPin size={16} />
                <span className="uppercase tracking-widest">{record.location}</span>
              </div>
            )}

            <div className="w-full h-px bg-hh-green-dark/10 my-4"></div>

            <div className="w-full flex justify-between items-center text-xs font-bold text-hh-green-dark/70 uppercase">
              <span className="tracking-widest">ID: {record.uniqueId}</span>
              <span className="tracking-widest">OCT 28–31 2026</span>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}
