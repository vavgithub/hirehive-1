import { useRef, useState, useCallback } from 'react';

/**
 * Audio-only MediaRecorder hook extracted from the Assessment.jsx pattern
 * (which inlines video+audio recording). Use for voice interview capture.
 */
export function useAudioRecorder() {
  const [isRecording, setIsRecording] = useState(false);
  const [error, setError] = useState(null);

  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);
  const streamRef = useRef(null);
  const startTimeRef = useRef(null);

  const startRecording = useCallback(async () => {
    setError(null);
    chunksRef.current = [];

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const mimeType = MediaRecorder.isTypeSupported('audio/webm;codecs=opus')
        ? 'audio/webm;codecs=opus'
        : 'audio/webm';

      const mediaRecorder = new MediaRecorder(stream, { mimeType });
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) chunksRef.current.push(event.data);
      };

      mediaRecorder.start(1000);
      startTimeRef.current = Date.now();
      setIsRecording(true);
    } catch (err) {
      setError(err.message || 'Microphone access failed.');
      setIsRecording(false);
    }
  }, []);

  const stopRecording = useCallback(() => {
    return new Promise((resolve, reject) => {
      const mediaRecorder = mediaRecorderRef.current;
      if (!mediaRecorder) {
        reject(new Error('No active recording.'));
        return;
      }

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
        const durationSeconds = (Date.now() - startTimeRef.current) / 1000;

        streamRef.current?.getTracks().forEach((track) => track.stop());

        setIsRecording(false);
        resolve({ blob, durationSeconds });
      };

      mediaRecorder.stop();
    });
  }, []);

  return { isRecording, error, startRecording, stopRecording };
}
