import { IMusic } from '~/type/IMusic'

export const mockData: { listMusics: IMusic[] } = {
  listMusics: [
    {
      _id: '1',
      name: 'Hallelujah Money (feat. Benjamin Clementine)',
      artUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Music114/v4/ad/f6/74/adf6743c-1aa7-c254-a503-b4d343be2d03/190295824822.jpg/{w}x{h}bb.jpg',
      artistName: ['Gorillaz', 'Gorillaz 2'],
      musicUrl:
        'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/d7/69/b4/d769b481-b206-6935-5ace-c4f7a19a3849/mzaf_15939113207811595552.plus.aac.ep.m4a'
    },
    {
      _id: '2',
      name: 'See You Again (feat. Charlie Puth)',
      artUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/e6/8a/68/e68a688e-129e-cb9d-938f-bc3ee37059ae/075679930910.jpg/{w}x{h}bb.jpg',
      artistName: ['Wiz Khalifa', 'Charlie Puth'],
      musicUrl:
        'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview126/v4/d8/df/0b/d8df0bf5-c518-8e10-3bcb-48ece88a44cb/mzaf_15402632809603686925.plus.aac.ep.m4a'
    }
  ]
}
