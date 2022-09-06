// @ts-check

module.exports = (robot) => {
  robot.hear(/mailbot install/i, (res) => {
    const { room: channelId } = res.envelope
    robot.brain.set('mailbox-channel-id', channelId)
    res.send(channelId + ' をメールボックスに設定しました')
  })

  robot.hear(/.*$/i, (res) => {
    const { text, user } = res.message
    const mailboxChannelId = robot.brain.get('mailbox-channel-id')
    const { room: channelId } = res.envelope
    if (mailboxChannelId === channelId) return

    res.send('メッセージを受け取りました\n担当からDMが来るまでお待ち下さい')
    robot.messageRoom(mailboxChannelId, `<@${user.id}>: '${text}'`)

    // res.message.user.id
  })
}
